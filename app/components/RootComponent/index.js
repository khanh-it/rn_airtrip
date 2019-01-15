import React, { PureComponent } from 'react';
import { View } from 'react-native';
// Global styles
import styles from '../../assets/css/styles';
// Component(s)
// import WebViewComponent from '../WebViewComponent';

/**
 * @class RootComponent
 */
export default class RootComponent extends PureComponent {
    render() {
      let { children } = this.props;
      return (
        <View style={[styles.html]}>
          {children}
          {/* <WebViewComponent ref={ref => {
            // Public webview util.
            $g.utils.WebView = (this.refWebView = ref);
          }} /> */}
        </View>
      );
    }
}