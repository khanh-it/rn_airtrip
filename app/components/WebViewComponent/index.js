//
import React, { PureComponent } from 'react';
//
import { View } from 'react-native';

// Css
import styles from './styles';

// Component(s)
import WebViewComponent from './WebViewComponent';

/**
 * @class WebViewComponent
 */
export default class WebViewRoot extends PureComponent {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      webviews: [] // list of webviews
    };

    // Bind method(s)
    this.open = this.open.bind(this);
    this.hide = this.hide.bind(this);
    this.close = this.close.bind(this);
    this.onWebViewClose = this.onWebViewClose.bind(this);
  }

  static guid() {
    return ((new Date()).getTime() + Math.random()).toString();
  }

  componentDidMount() {}

  onWebViewClose(webview) {
    if (webview instanceof WebViewComponent) {
      let { webviews } = this.state;
      let index = (webviews || []).findIndex(item => (item.webview === webview));
      if (index >= 0) {
        // Reset data
        let wvItem = webviews[index] || {};
        for (let prop in wvItem) {
          wvItem[prop] = null;
        }
        webviews.splice(index, 1);
        webviews = webviews.concat([]); // <-- trigger state changes
        this.setState(() => ({ webviews }));
      }
    }
  }

  open(props = {}, opts = {}) {
    let { webviews } = this.state;
    // Format input
    // ...

    // spawn new webview
    let key = WVComp.guid();
    let component = (
      <WebViewComponent
        {...props}
        key={key}
        ref={ref => {
          wvItem.webview = ref;
          if (props.ref) {
            props.ref(ref);
          }
        }}
        onClose={this.onWebViewClose}
      />
    );
    let wvItem = { key, webview: null, component };
    //
    webviews = webviews.concat([wvItem]); // <-- trigger state change
    this.setState({ webviews });
    // Return
    return wvItem;
  }

  hide() {
    alert('not yet implemented!');
  }

  close(wvItem, opts = {}) {
    let key = '';
    let component = null;
    if (typeof wvItem === 'string') {
      key = wvItem;
    }
    if (wvItem instanceof WebViewComponent) {
      component = wvItem;
    }
    if (typeof wvItem === 'object') {
      key = wvItem.key;
      component = wvItem.component;
    }
    // 
    let foundWVItem = null;
    if (key || component) {
      let { webviews } = this.state;
      foundWVItem = (webviews || []).find(item => ((item.key === key) || (item.component === component)));
    }
    if (!foundWVItem) {
      return alert('`wvtem` not found!');
    }
    //
    let { webview } = foundWVItem;
    return webview.close(opts);
  }

  render() {
    let { webviews } = this.state;
    console.log('render WebViewRoot', webviews.length);
    return (webviews.length
      ? (<View style={[styles.root]}>
      {webviews.map(({ component }) => (component))}
      </View>)
      : null
    );
  }
}
// Make alias
const WVComp = WebViewRoot;
