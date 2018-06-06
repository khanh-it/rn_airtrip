//
import React, { PureComponent } from 'react';
//
import {
  View,
  Text,
  WebView,
  TouchableOpacity
} from 'react-native';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import * as Ani from 'react-native-animatable';

//
import styles from './styles';

/**
 * @class WebViewComponent
 */
export default class WebViewComponent extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {};

    // Bind method(s)
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(url, opts = {}) {
    this._reAniView.transitionTo({
      opacity: 1, transform: [{ translateY: 0 }]
    }, opts.duration || 512);
  }

  hide(opts = {}) {
    this._reAniView.transitionTo({
      opacity: 0, transform: [{ translateY: $g.dimensions.screen.height }]
    }, opts.duration || 512);
  }

  render() {
    let { children } = this.props;
    let yourAlert = `
      document.body.style.backgroundColor = 'red';
    `;
    return (
      <Ani.View
        style={[styles.root]}
        ref={ref => { this._reAniView = ref; }}
      >
        <View style={[styles.head]}>
          <View style={[styles.headBtns]}>
            <TouchableOpacity onPress={this.hide}>
              <Ionicon name='md-close' style={[styles.headBtn, styles.btnClose]} />
            </TouchableOpacity>
          </View>
          <View style={[styles.headTitle]}>
            <Text style={[styles.titleTxt]}>Title text</Text>
          </View>
        </View>
        <View style={[styles.webview]}>
          <WebView
            style={[styles.webviewWV]}
            ref={ref => { this._refWebView = ref; }}
            source={{ uri: 'http://10.11.8.92/RN/rn_airtrip/API/' }}
            injectedJavaScript={yourAlert}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode={'compatibility'}
          />
        </View>
      </Ani.View>
    );
  }
}