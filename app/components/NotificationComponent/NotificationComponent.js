/**
 * 
 */
import React, { PureComponent } from "react";
//
import {
  View,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
//
import * as Ani from 'react-native-animatable';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
// Css
import styles from './styles';
//
import * as constants from './constants';
// 
// import NewsItemComponent from './NewsItemComponent';

/**
 * @class NotificationComponent
 */
export default class NotificationComponent extends PureComponent {
  constructor(props) {
    super(props);
    // Init state
    this.state = {
      show: !!props.show,
      duration: 512,
      // @see https://github.com/facebook/react-native/issues/12981
      fetchNewsFeedCnf: {
        interval: (60 * 1),
        stepCur: 0,
        stepRun: 5
      }
    };
    // Bind method(s)
    this.fetchNewsFeed = this.fetchNewsFeed.bind(this);
    this.handleMarkAllRead = this.handleMarkAllRead.bind(this);
    this.handleViewNewsDetails = this.handleViewNewsDetails.bind(this);
  }

  /**
   * @var {Object}
   */
  _rss = null;

  /**
   * @var {Number|String}
   */
  _fetchNewsFeedTimer = null;

  componentDidMount() {
    let { fetchNewsFeedCnf } = this.state;

    // Fetch news feed
    let fetchNewsFeed = async () => {
      let { stepCur, stepRun, interval } = fetchNewsFeedCnf;
      if (stepCur === 0) {
        let { storeNewsData } = this.props;
        let data = await this.fetchNewsFeed();
        storeNewsData(data);
      }
      // Run interval!
      stepCur += 1;
      Object.assign(fetchNewsFeedCnf, {
        stepCur: (stepCur = (stepCur > stepRun) ? 0 : stepCur)
      });
      // console.log(`${stepCur}/${stepRun}`);
      this._fetchNewsFeedTimer = setTimeout(fetchNewsFeed, 1000 * interval);
    };
    fetchNewsFeed();
    //.end
  }

  /* static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
    // Typical usage (don't forget to compare props):
    if (props.news !== state.news) {
      return {
        news: props.news
      };
    }
    return null;
  } */

  componentWillUnmount() {
    clearTimeout(this._fetchNewsFeedTimer);
  }

  /**
   * 
   */
  async fetchNewsFeed() {
    let res = await fetch(constants.NEWS_FEED_URL);
    let xml = await res.text();
    let rss = await new Promise((resolve, reject) => {
      $g.utils.xml2js.parseString(xml, (err, { rss }) => {
        if (!err && rss) { // case: OK
          this._rss = rss;
          // Parse, format, rss data
          let { channel } = (rss || {});
          let { item } = (channel[0] || {});
          let data = [];
          for (let news of item) {
            Object.assign(news, {
                id: (news.link[0].toString().match(/.*news\/(\d+).*/) || [])[1],
                read: false
            });
            data.push(news);
          }
          resolve(data);
          //.end
        }
        reject(err);
      });
    });
    return rss;
  }

  /**
   * 
   */
  handleMarkAllRead(item = null) {
    let { news } = this.props;
    let { data } = (news || {});
    if (item) { // Case: mark 1 item
      data = [item];
    }
    data = data
      .filter(item => (item.id && !(item.read === true)))
      .map(({ id }) => ({ id, read: true }))
    ;
    if (data.length) {
      let { markNewsRead } = this.props;
      markNewsRead(data);
    }
  }

  /**
   * 
   * @param {*} news 
   */
  handleViewNewsDetails(news, index) {
    // open + view link on webview
    $g.utils.WebView.main.open({ uri: news.link[0] });
    // mark as read?
    setTimeout(this.handleMarkAllRead.bind(this, news), 1000);
  }

  /**
   * Render news (notification) list
   */
  _renderList() {
    let { news } = this.props;
    return (
      <FlatList
        style={[styles.newsList]}
        data={(news.data || [])}
        extraData={this.state}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.handleViewNewsDetails(item, index)}
            >
              <View style={[styles.news, (item.read && styles.newsRead)]}>
                <View style={[styles.newsItem, styles.newsDate]}>
                  <Text style={[styles.newsTxt]}>{index + 1}.[{item.id}]</Text>
                  <Text style={[styles.newsTxt]}>{item.pubDate[0]}</Text>
                  {!item.read && (<Text style={[styles.newsTxt, styles.newsTxtUnread]}>{$g.Lang('未読')}</Text>)}
                </View>
                <View style={[styles.newsItem, styles.newsMsg]}>
                  <Text style={[styles.newsTxt]}>{item.title[0]}</Text>
                </View>
                <View style={[styles.newsItem, styles.newsDetails]}>
                  <Ionicon style={[styles.newsDetailsIcon]} name='ios-arrow-forward' />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        removeClippedSubviews={true}
      />
    );
  }

  _renderPage() {
    let { duration} = this.state;
    let { news } = this.props;
    return (
      <Ani.View
        key='page'
        ref={ref => { this.refPageView = ref; }}
        style={[styles.page]}
      >
        <View style={[styles.pageBg]} />
        <View style={[styles.pageRoot]}>
          {/*Page's head*/}
          <View style={[styles.pageHead]}>
            {/*Topbars*/}
            <View style={[styles.pageTopbars]}>
              <TouchableOpacity
                style={[styles.pageIcon]}
                onPress={() => this.refPageView.transitionTo({
                  opacity: 0, transform: [{ translateY: -$g.dimensions.screen.height }]
                }, duration)}
              >
                <View><Ionicon name='md-close' style={[styles.pageIconClose]} /></View>
              </TouchableOpacity>
            </View>
            {/*.end#Topbars*/}

            {/*Page's title*/}
            <View style={[styles.pageTitle]}>
              <Text style={[styles.pageTitleTxt]}>
                {$g.Lang('ニュース・運行状況')}
              </Text>
            </View>
            {/*.end#Page's title*/}

            {/*Toolbars*/}
            <View style={[styles.pageToolbars]}>
              <View style={[styles.pageToolbarsL]}>
                <Text style={[styles.pageToolbarTxt]}>
                  {$g.Lang('未読件数：%0$件', [news.count])}
                </Text>
              </View>
              <View style={[styles.pageToolbarsR]}>                
                <TouchableOpacity
                  onPress={() => this.handleMarkAllRead()}
                >
                  <View>
                    <Text style={[styles.pageToolbarTxt]}>
                      <Ionicon name='md-checkmark' style={[styles.pageIconClose]} /> {$g.Lang('すべて既読にする')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/*.end#Toolbars*/}
          </View>
          {/*.end#Page's head*/}

          {/*Page's body*/}
          {this._renderList()}
          {/*.end#Page's body*/}
        </View>
      </Ani.View>
    );
  }

  _renderFloatingIcon() {
    let { duration } = this.state;
    let { news } = this.props;
    let { count, readCount } = (news || {});
    let readCnt = ((count || 0) - (readCount || 0));
    // Render
    return (
      <TouchableOpacity
        key='fIcon'
        style={[styles.fIcon]}
        onPress={evt => this.refPageView.transitionTo({
          opacity: 1, transform: [{ translateY: 0 }]
        }, duration)}
      >
        <View style={[styles.fIconIonicon]}>
          <Ionicon name='ios-notifications-outline' size={20} style={[styles.fIconImg]} />
        </View>
        {readCnt
          ? (<View style={[styles.fIconBadge]}>
            <Text style={[styles.fIconBadgeTxt]}>{readCnt}</Text>
          </View>)
          : null
        }
      </TouchableOpacity>
    );
  }

  render() {
    // console.log('render NotificationComponent');
    return ([
      // Floating icon
      this._renderFloatingIcon(),
      // Page
      this._renderPage()
    ]);
  }
}
