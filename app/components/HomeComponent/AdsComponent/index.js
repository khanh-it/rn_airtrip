/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  Text,
  WebView
} from 'react-native';

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

  render() {
    let { history } = this.state;
    return (
      <View style={styles.root}>
        <WebView
          source={{ uri: 'https://www-airtrip-renewal-dev.airtrip.jp/information.php' }}
          style={styles.webview}
        />
      </View>
    );
  }
}
