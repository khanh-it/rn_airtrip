/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  ScrollView,
  // Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
//
import * as Ani from 'react-native-animatable';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
// Css
import styles from './styles';

/**
 * @class NotificationComponent
 */
export default class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    // Init state
    this.state = {
      show: !!props.show,
      duration: 512
    };
  }

  componentDidMount() {
  }

  /**
   * Render news (notification) list
   */
  _renderList() {
    let newsList = [{}, { read: true }, {}];
    let html = newsList.map((news, idx) => {
      return (
        <View key={`news-${idx}`} style={[styles.news, (news.read ? styles.newsRead : null)]}>
          <View style={[styles.newsItem, styles.newsDate]}>
            <Text style={[styles.newsTxt]}>2018/05/30</Text>
          </View>
          <View style={[styles.newsItem, styles.newsMsg]}>
            <Text style={[styles.newsTxt]}>Noi dung news...</Text>
          </View>
          <View style={[styles.newsItem, styles.newsDetails]}>
            <Ionicon style={[styles.newsDetailsIcon]} name='ios-arrow-forward' />
          </View>
        </View>
      );
    });
    return (
      <View style={styles.newsList}>{html}</View>
    );
  }

  _renderPage() {
    let { duration } = this.state;
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
              <TouchableWithoutFeedback
                onPress={() => this._refPageView.transitionTo({
                  opacity: 0, transform: [{ translateY: -$g.dimensions.screen.height }]
                }, duration)}
              >
                <Ionicon name='md-close' style={[styles.pageIconClose]} />
              </TouchableWithoutFeedback>
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
                  {$g.Lang('未読件数：%0$件', [0])}
                </Text>
              </View>
              <View style={[styles.pageToolbarsR]}>                
                <TouchableWithoutFeedback
                  onPress={evt => this.handleMarkAllRead.bind(this)}
                >
                  <View>
                    <Text style={[styles.pageToolbarTxt]}>
                      <Ionicon name='md-checkmark' style={[styles.pageIconClose]} /> 
                      {$g.Lang('すべて既読にする')}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {/*.end#Toolbars*/}
          </View>
          {/*.end#Page's head*/}

          {/*Page's body*/}
          <ScrollView style={[styles.pageBody]} contentContainerStyle={[styles.pageBodyContent]}>
            {this._renderList()}
          </ScrollView>
          {/*.end#Page's body*/}
        </View>
      </Ani.View>
    );
  }

  _renderFloatingIcon() {
    let { duration } = this.state;
    return (
      <View key='fIcon' style={[styles.fIcon]}>
        <View style={[styles.fIconIonicon]}>
          <TouchableWithoutFeedback
            style={[{ margin: 0, padding: 0, backgroundColor: 'transparent' }]}
            onPress={evt => this._refPageView.transitionTo({
              opacity: 1, transform: [{ translateY: 0 }]
            }, duration)}
          >
            <Ionicon name='ios-notifications-outline' size={20} style={[styles.fIconImg]} />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.fIconBadge]}>
          <Text style={[styles.fIconBadgeTxt]}>5</Text>
        </View>
      </View>
    );
  }

  render() {
    let { show } = this.state;
    return ([
      // Floating icon
      this._renderFloatingIcon(),
      // Page
      this._renderPage()
    ]);
  }
}
