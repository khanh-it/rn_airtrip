import SplashScreen from 'react-native-splash-screen';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
// Component(s)
import WebViewComponent from '../WebViewComponent';
import { HomeStackContainer } from '../routes';

// Global styles
import styles from '../../assets/css/styles';

/**
 * @class RootComponent
 */
export default class RootComponent extends PureComponent
{
  componentDidMount()
  {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render()
  {
    return (
      <View style={[styles.html]}>
        <HomeStackContainer
          ref={navigatorRef => {
            $g.navServTop.setNavigator(navigatorRef);
          }}
        />
        {/* Public webview util. */}
        <WebViewComponent ref={ref => {
          $g.utils.WebView = (this.refWebView = ref);
        }} />
      </View>
    );
  }
}