/**
 * 
 */
import React, { Component } from "react";
//
import { View } from 'react-native';
//
import {
  WebViewExtended
} from 'react-native-my'
// Css
import styles from './styles';

/**
 * @class AdsComponent
 */
export default class AdsComponent extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {};
  }

  onWillNavigate(source) {
    // alert('onWillNavigate: ' + JSON.stringify(source));
    $g.utils.WebView.main.open(source);
  }

  render() {
    return (
      <View style={[styles.root]}>
        <WebViewExtended
          wvref={ref => { this.refWebView = ref; }}
          style={[styles.webview]}
          source={{ uri: $g.configs.URL.banner }}
          onWillNavigate={this.onWillNavigate.bind(this)}
          willNavigateRules={false}
        />
      </View>
    );
  }
}
