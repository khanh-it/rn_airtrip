//
import React, { PureComponent } from 'react';
//
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import * as Ani from 'react-native-animatable';

// Css
import styles from './styles';

//
import injectedJavaScript from './WebViewBridge';
import HeadTitleComponent from './HeadTitleComponent';
import WebViewLoadComponent from './WebViewLoadComponent';

/**
 * @class WebViewComponent
 */
export default class WebViewComponent extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      // show/hide head more menu
      showheadMenuMenu: false
    };

    // Bind method(s)
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.more = this.more.bind(this);
  }

  componentDidMount() {
    this.open(require('./index.html'));
  }

  open(source, opts = {}) {
    let duration = (opts.duration || 512);
    this.refAniViewRoot.transitionTo({
      opacity: 1, transform: [{ translateY: 0 }]
    }, duration);
    //
    setTimeout(() => {
      this.refWebViewWV.load(source);
    }, duration);
  }

  close(opts = {}) {
    let duration = (opts.duration || 512);
    this.refAniViewRoot.transitionTo({
      opacity: 0, transform: [{ translateY: $g.dimensions.screen.height }]
    }, duration);
    //
    setTimeout(() => {
      this.refWebViewWV.load(null);
    }, duration);
  }

  more(act = '') {
    // show/hide more menu
    const toggleMenu = () => {
      this.state.showheadMenuMenu = !this.state.showheadMenuMenu;
      this.refAniViewheadMenu.transitionTo({
        opacity: this.state.showheadMenuMenu ? 1 : 0
      });
    };

    switch (act) {
      // reload
      case 'reload': {
        this.refWebView.reload();
      } break;
      // back
      case 'back': {
        this.refWebView.goBack();
      } break;
      // forward
      case 'forward': {
        this.refWebView.goForward();
      } break;
    }
    // show/hide more menu?
    toggleMenu();
  }

  onMessage(event) {
    let msgData = event.nativeEvent.data;
    // post back reply as soon as possible to enable sending the next message
    this.refWebView.postMessage(msgData);
    try {
      msgData = JSON.parse(msgData);
      //
      //switch (msgData.type) {}
      //.end
    } catch(err) {
      console.warn(err);
    }
    console.log('msgData: ', msgData);
    // trigger success callback
    //...
  }

  onNavigationStateChange(event) {
    // console.log('onNavigationStateChange: ', event);
    // Update head title text
    let { title } = event;
    this.refHeadTitleComponent.updatetext(title);
  }
  

  _renderHead() {
    return ([
      /*head*/
      <View key='head' style={[styles.head]}>
        <View style={[styles.headLR, styles.headL]}>
          <TouchableOpacity onPress={this.close}>
            <View><Ionicon name='md-close' style={[styles.headBtn, styles.btnClose]} /></View>
          </TouchableOpacity>
        </View>
        <View style={[styles.headTitle]}>
          <HeadTitleComponent
            ref={ref => { this.refHeadTitleComponent = ref; }} 
            style={[styles.titleTxt]}
          />
        </View>
        <View style={[styles.headLR, styles.headR]}>
          <TouchableOpacity onPress={this.more}>
            <View><Ionicon name='md-more' style={[styles.headBtn, styles.btnMore]} /></View>
          </TouchableOpacity>
        </View>
      </View>,
      /*menu*/
      <Ani.View
        key='menu'
        ref={ref => { this.refAniViewheadMenu = ref; }}
        style={[styles.headMenu]}
      >
        <View style={[styles.headMenuItem]}>
          <TouchableOpacity onPress={() => this.more('reload')}>
            <View><Text style={[styles.headBtnTxt, styles.btnTxtReload]}>
              <Ionicon name='md-refresh' style={[styles.headBtnIcon, styles.btnIconReload]} /> {$g.Lang('Reload')}
            </Text></View>
          </TouchableOpacity>    
        </View>
        <View style={[styles.headMenuItem]}>
          <TouchableOpacity onPress={() => this.more('back')}>
            <View><Text style={[styles.headBtnTxt, styles.btnTxtBack]}>
              <Ionicon name='md-arrow-back' style={[styles.headBtnIcon, styles.btnIconBack]} /> {$g.Lang('Back')}
            </Text></View>
          </TouchableOpacity>    
        </View>
        <View style={[styles.headMenuItem]}>
          <TouchableOpacity onPress={() => this.more('forward')}>
            <View><Text style={[styles.headBtnTxt, styles.btnTxtForward]}>
              <Ionicon name='md-arrow-forward' style={[styles.headBtnIcon, styles.btnIconForward]} /> {$g.Lang('Forward')}
            </Text></View>
          </TouchableOpacity>    
        </View>
      </Ani.View>
    ]);
  }

  _renderWebView() {
    return (
      <View style={[styles.webview]}>
        <WebViewLoadComponent
          ref={ref => { this.refWebViewWV = ref; }}
          wbref={ref => { this.refWebView = ref; }}
          style={[styles.webviewWV]}
          source={null}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (<ActivityIndicator size="large" color="#0000ff" />)}
          // mixedContentMode={'compatibility'}
          // injectedJavaScript={injectedJavaScript} // <-- uses "onLoad"
          onLoad={() => { this.refWebView.injectJavaScript(injectedJavaScript); }}
          onMessage={this.onMessage.bind(this)}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }

  render() {
    console.log('render WebViewComponent');
    return (
      <Ani.View
        style={[styles.root]}
        ref={ref => { this.refAniViewRoot = ref; }}
      >
        {this._renderHead()}
        {this._renderWebView()}
      </Ani.View>
    );
  }
}


