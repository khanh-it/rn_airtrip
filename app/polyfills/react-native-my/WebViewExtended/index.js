import React, { PureComponent } from 'react';
import { WebView } from 'react-native';
import injectedJS from './WebViewBridge';

/**
 * @class WebViewExtended
 */
export default class WebViewExtended extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {};

    // Bind method(s)
    // ...
  }

  onMessage(event) {
    let { onMessage, onScroll } = this.props;
    // Inject js...
    let msgObj = null;
    try {
      msgObj = JSON.parse(event.nativeEvent.data);
      if (msgObj && ('__WebViewOnScroll' === msgObj.type)) {
        let { scroll } = msgObj;
        // Fire callback!
        return onScroll({ scroll });
      }
    } catch (err) {
      // ...
    }
    // Fire callback?
    if (onMessage) {
      return onMessage(event);
    }
  }

  onLoadEnd(event) {
    let { onLoadEnd } = this.props;
    // Inject js...
    this.refWebView.injectJavaScript(injectedJS());
    // Fire callback?
    if (onLoadEnd) {
      return onLoadEnd(event);
    }
  }

  render() {
    let { onScroll, wvref, ...props } = this.props;
    //
    let ref = (ref) => {
      this.refWebView = ref;
      if (wvref) {
        return wvref(ref);
      }
    };
    //.end
    //
    if (onScroll) {
      props.onMessage = this.onMessage.bind(this);
      props.onLoadEnd = this.onLoadEnd.bind(this);
    }
    //.end
    return (<WebView {...props} ref={ref} />);
  }
}
