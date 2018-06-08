//
import React, { PureComponent } from 'react';
//
import {
  View,
  Text,
  WebView,
  TouchableOpacity,
  Button
} from 'react-native';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import * as Ani from 'react-native-animatable';

//
import styles from './styles';

//
import injectedJavaScript from './WebViewBridge';

/**
 * @class WebViewComponent
 */
export class WebViewComponent extends PureComponent {

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
    return alert('onWebViewMessage');
    console.log('onWebViewMessage: ', event);
    // post back reply as soon as possible to enable sending the next message
    this.myWebView.postMessage(event.nativeEvent.data);
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch(err) {
      console.warn(err);
      return;
    }
    // trigger success callback
    console.log('msgData: ', msgData);
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
            source={{ uri: 'http://10.11.8.92/RN/rn_airtrip/API/' }}
            onMessage={this.onWebViewMessage}
            injectedJavaScript={injectedJavaScript}
            // javaScriptEnabled={true}
            // domStorageEnabled={true}
            // mixedContentMode={'compatibility'}
            // onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
          />
        </View>
      </Ani.View>
    );
  }
}

export default class InjectJS extends React.Component {
  webview = null

  state = {
    messagesReceivedFromWebView: 0,
    message: '',
  }

  onMessage = e => this.setState({
    messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
    message: e.nativeEvent.data,
  })

  postMessage = () => {
    if (this.webview) {
      this.webview.postMessage('"Hello" from React Native!');
    }
  }
  
  injectJS = () => {
    // const script = 'document.write("Injected JS ")';
    const script = `
  var messagesReceivedFromReactNative = 0;
  document.addEventListener('message', function(e) {
    messagesReceivedFromReactNative += 1;
    document.getElementsByTagName('p')[0].innerHTML =
      'Messages received from React Native: ' + messagesReceivedFromReactNative;
    document.getElementsByTagName('p')[1].innerHTML = e.data;
  });

  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    window.postMessage('"Hello" from the web view');
  });
`;
  return script;
    if (this.webview) {
      this.webview.injectJavaScript(script);
    }
  }
  render() {
    const {messagesReceivedFromWebView, message} = this.state;
    return (
      <View style={[styles.root]}>
        <View style={{ flex: 1, backgroundColor: 'white', }}>
          <Text>Messages received from web view: {messagesReceivedFromWebView}</Text>
          <Text>{message || '(No message)'}</Text>
          <View style={styles.buttons}>
            <Button title="Send Message to Web View" enabled onPress={this.postMessage} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <WebView
            ref={webview => { this.webview = webview; }}
            style={{
              // backgroundColor: 'grey',
              height: 300,
            }}
            // source={{uri: 'https://www.facebook.com'}}
            source={{ uri: 'http://10.11.8.92/RN/rn_airtrip/API/index.html' }}
            scalesPageToFit={true}
            onMessage={this.onMessage}
            injectedJavaScript={injectedJavaScript}
            onLoad={this.postMessage.bind(this)}
          />
        </View>
        <View style={styles.buttons}>
          <Button title="Inject JS" enabled onPress={this.injectJS} />
        </View>
    </View>
    );
  }
}