/**
 * 
 */
import React, { Component } from "react";
//
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
// Css
import styles from './styles';

// Component(s)
import ImgBgSliderComponent from './ImgBgSliderComponent';
import SearchHistoryComponent from './SearchHistoryComponent';
import WebLinkComponent from './WebLinkComponent';
import AdsComponent from './AdsComponent';
import FooterNavComponent from './FooterNavComponent';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      auth: null
    };

    // Bind method(s)
    this.onMainNav = this.onMainNav.bind(this);
  }

  componentDidMount() {}

  /**
   * 
   * @param {*} nav 
   * @param {*} evt 
   */
  onMainNav(nav, evt) {
    switch (nav.toLowerCase()) {
      // 
      case 'domestic': {

      } break;
      //
      case 'overseas': {
        // Open webview
        $g.utils.WebView.main.open({
          uri: $g.configs.URL.overseas_secure
        });
      } break;
    }
  }

  /**
   * Page's header
   */
  _renderPageHeader() {
    //
    let { auth } = this.state;
    //  
    return (
      <View style={[styles.head]}>
        {/*Head title*/}
        <View style={[styles.title]}>
          <Text style={[styles.titleTxt]}>
            {$g.Lang('エアトリ')}
          </Text>
          <Text style={[styles.titleWelcome]}>
            {$g.Lang(auth ? 'さん、おかえりなさい' : 'ゲストさん、こんにちは')}
          </Text>
        </View>
        {/*.end#Head title*/}

        {/*Main navigation*/}
        <View style={[styles.mainNav]}>
          <View style={[styles.mainNavL]}>
            <TouchableWithoutFeedback
              onPress={(evt) => this.onMainNav('domestic', evt)}
            >
              <View style={[styles.mnavItem, styles.mnavDomestic]}>
                <View style={[styles.mnavItemBg]} />
                <View style={[styles.mnavItemContent]}>
                  <Image style={[styles.mnavImg]} source={require('../../assets/img/ic_domestic.png')} />
                  <Text style={[styles.mnavItemTxt]}>
                    {$g.Lang('国内航空券')}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.mainNavR]}>
            <TouchableWithoutFeedback
              onPress={(evt) => this.onMainNav('overseas', evt)}
            >
              <View style={[styles.mnavItem, styles.mnavOverseas]}>
                <View style={[styles.mnavItemBg]} />
                <View style={[styles.mnavItemContent]}>
                  <Image style={[styles.mnavImg]} source={require('../../assets/img/ic_overseas.png')} />
                  <Text style={[styles.mnavItemTxt]}>
                    {$g.Lang('海外航空券')}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/*.end#Main navigation*/}
      </View>
    );
  }

  render() {
    let { bgSrc } = this.state;
    return (
      <View style={[styles.body]}>
        <ImgBgSliderComponent key='bg' />
        <View key='root' style={[styles.root]}>
          <ScrollView
            style={[styles.page]}
            showsVerticalScrollIndicator={false}
          >
            {this._renderPageHeader()}
            <WebLinkComponent key='weblinks' />
            <SearchHistoryComponent key='search-history' />
          </ScrollView>
          <View key='footer' style={[styles.footer]}>
            <AdsComponent key='ads' />
            <FooterNavComponent key='footer-navigation' />
          </View>
        </View>
      </View>
    );
  }
}
