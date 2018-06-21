/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
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
    return (
      <View style={styles.root}>
        <WebView
          source={{ uri: $g.configs.banner_url }}
          style={styles.webview}
        />
      </View>
    );
  }
}
