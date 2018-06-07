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

//
import injectedJavaScript from './injectedJavaScript';

// https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/RNTester/js/WebViewExample.js

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
    this.onWebViewMessage = this.onWebViewMessage.bind(this);
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

  onWebViewMessage(event) {
    console.log('onWebViewMessage: ', event);
    // post back reply as soon as possible to enable sending the next message
    this.myWebView.postMessage(event.nativeEvent.data);
    let msgData;
    try {
        msgData = JSON.parse(event.nativeEvent.data);
    }
    catch(err) {
        console.warn(err);
        return;
    }
    // invoke target function
    const response = this[msgData.targetFunc].apply(this, [msgData]);
    // trigger success callback
    msgData.isSuccessfull = true;
    msgData.args = [response];
    this.myWebView.postMessage(JSON.stringify(msgData))
  }

  render() {
    let { children } = this.props;
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
            ref={webview => { this.myWebView = webview; }}
            onMessage={this.onWebViewMessage}
            source={{ uri: 'http://10.11.8.92/RN/rn_airtrip/API/' }}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode={'compatibility'}
            // onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
          />
        </View>
      </Ani.View>
    );
  }
}