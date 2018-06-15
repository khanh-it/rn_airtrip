/**
 * 
 */
import React, { PureComponent } from "react";
//
import {
  View,
  ScrollView,
  FlatList,
  // Image,
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
      fetchNewsFeedInterval: 1000 * 60 * 1, // 5m
      // news feed data
      news: props.news || {}
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
  _fetchNewsFeedInterval = null;

  componentDidMount() {
    let { storeNewsData } = this.props;
    let { fetchNewsFeedInterval } = this.state;

    // Fetch news feed
    this._fetchNewsFeedInterval = setInterval(async () => {
      let { news } = this.state;
      let newsData = await this.fetchNewsFeed();
      storeNewsData(newsData);
    }, fetchNewsFeedInterval);
    //.end
  }

  componentWillUnmount() {
    clearInterval(this._fetchNewsFeedInterval);
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
    let { markNewsRead } = this.props;
    let { news } = this.state;
    let { data } = (news || {});
    if (item) { // Case: mark 1 item
      data = [item];
    }
    data = data.map(({ id }) => ({ id, read: true }));
    markNewsRead(data);
  }

  /**
   * 
   * @param {*} news 
   */
  handleViewNewsDetails(news, index) {
    // open + view link on webview
    $g.utils.WebView.open({
      source: { uri: news.link[0] }
    });
    // mark as read
    this.handleMarkAllRead(news);
  }

  /**
   * Render news (notification) list
   */
  _renderList() {
    let { news } = this.state;
    return (
      <FlatList
        style={[styles.newsList]}
        data={(news.data || [])}
        keyExtractor={(item, index) => `news-${index}`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => this.handleViewNewsDetails(item, index)}
            >
              <View style={[styles.news, (item.read && styles.newsRead)]}>
                <View style={[styles.newsItem, styles.newsDate]}>
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
      />
    );
  }

  _renderPage() {
    let { duration, news } = this.state;
    return (
      <Ani.View
        key='page'
        ref={ref => { this._refPageView = ref; }}
        style={[styles.page]}
      >
        <View style={[styles.pageBg]} />
        <View style={[styles.pageRoot]}>
          {/*Page's head*/}
          <View style={[styles.pageHead]}>
            {/*Topbars*/}
            <View style={[styles.pageTopbars]}>
              <TouchableOpacity
                onPress={() => this._refPageView.transitionTo({
                  opacity: 0, transform: [{ translateY: -$g.dimensions.screen.height }]
                }, duration)}
              >
                <Ionicon name='md-close' style={[styles.pageIconClose]} />
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
    let {
      duration,
      news
    } = this.state;
    let { count, readCount } = (news || {});
    let readCnt = ((count || 0) - (readCount || 0));
    // Render
    return (
      <View key='fIcon' style={[styles.fIcon]}>
        <View style={[styles.fIconIonicon]}>
          <TouchableOpacity
            style={[{ margin: 0, padding: 0, backgroundColor: 'transparent' }]}
            onPress={evt => this._refPageView.transitionTo({
              opacity: 1, transform: [{ translateY: 0 }]
            }, duration)}
          >
            <Ionicon name='ios-notifications-outline' size={20} style={[styles.fIconImg]} />
          </TouchableOpacity>
        </View>
        <View style={[styles.fIconBadge]}>
          {readCnt ? (<Text style={[styles.fIconBadgeTxt]}>{readCnt}</Text>) : null}
        </View>
      </View>
    );
  }

  render() {
    return ([
      // Floating icon
      this._renderFloatingIcon(),
      // Page
      this._renderPage()
    ]);
  }
}
