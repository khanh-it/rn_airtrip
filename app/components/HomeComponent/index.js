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
// import ImgBgSliderComponent from './ImgBgSliderComponent';

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

  render() {
    let { bgSrc } = this.state;
    return (
      <View style={[styles.body]}>
        <Text>Messaging</Text>
      </View>
      /* <View style={[styles.body]}>
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
      </View> */
    );
  }
}
