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

  static guid() {
    return ((new Date()).getTime() + Math.random()).toString();
  }

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
    this.onWebViewToggleVisibleStart = this.onWebViewToggleVisibleStart.bind(this);
    this.onWebViewToggleVisibleEnd = this.onWebViewToggleVisibleEnd.bind(this);
  }

  /**
   * Main webview item.
   * @var {Object}
   */
  wvItem = null;

  componentDidMount() {
    // Init main webview item
    this.wvItem = this.open(null, {
      props: { visible: false }
    });
  }

  onWebViewClose(webview) {
    let { webviews } = this.state;
    let index = (webviews || []).findIndex(item => (item.webview === webview));
    if (index >= 0) {
      // Case: main webview --> hide only!
      if (index === 0) { return; }
      // Reset data
      let wvItem = webviews[index] || {};
      for (let prop in wvItem) {
        wvItem[prop] = null;
      }
      webviews.splice(index, 1);
      webviews = webviews.concat([]); // <-- trigger state changes
      this.setState({ webviews });
    }
  }

  webviewToggleVisible(webview, visible) {
    let { webviews } = this.state;
    let wvItem = (webviews || []).find(item => (item.webview === webview));
    if (wvItem) {
      // trigger state changes
      webviews = webviews.concat([]);
      this.setState({ webviews });
    }
  }

  onWebViewToggleVisibleStart(webview, visible) {
    if (visible) {
      return this.webviewToggleVisible(webview, visible);
    }
  }

  onWebViewToggleVisibleEnd(webview, visible) {
    if (!visible) {
      return this.webviewToggleVisible(webview, visible);
    }
  }

  open(source = null, opts = {}) {
    let { webviews } = this.state;
    let props = (opts.props || {});
    // Format input
    // ...

    // spawn new webview
    let key = WVComp.guid();
    let component = (
      <WebViewComponent
        {...props}
        key={`wv-${key}`}
        ref={ref => {
          wvItem.webview = ref;
          if (props.ref) {
            return props.ref(ref);
          }
        }}
        // onClose={this.onWebViewClose}
        onToggleVisibleStart={this.onWebViewToggleVisibleStart}
        onToggleVisibleEnd={this.onWebViewToggleVisibleEnd}
        source={source}
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

  get main() {
    return this.wvItem.webview;
  }

  get isVisible() {
    let visible = false;
    let { webviews } = this.state;
    for (let wvItem of webviews) {
      if (wvItem.webview) {
        if (wvItem.webview.isVisible) {
          visible = true;
          break;
        }
      }
    }
    return visible;
  }

  render() {
    let { webviews } = this.state;
    console.log('render WebViewRoot', webviews.length, this.isVisible);
    return (webviews.length ? (
        <View style={[styles.root, this.isVisible && styles.rootVisible]}>
          {webviews.map(({ component }) => (component))}
        </View>
      ) : null
    );
  }
}
// Make alias
const WVComp = WebViewRoot;
