/**
 * Created by Guy Blank on 3/9/17.
 *
 *  This is a sample provides an API to send & receive messages to and from the React-Native WebView (using postMessage/onMessage WebView API).
 *  A sample project that uses the bridge is available here https://github.com/blankg/rn-webview-bridge-sample
 *
 *  webViewBridge.send('functionToInvoke', {mydata: 'test'}, function(){debugLog('success')},function(){debugLog('error')});
 *
 *  The API is designed to be similar to the Cordova exec API so migration to it should be almost seamless.
 *  The API also provides solution to a React-Native WebView bug in iOS which causes sending consecutive postMessage calls to override each other.
 *
 *  Handling message on the React-Native side:
 *   <WebView
 *       ref={webview => { this.myWebView = webview; }}
 *       onMessage={this.onWebViewMessage}
 *  />
 *
 *  onWebViewMessage(event) {
 *      // post back reply as soon as possible to enable sending the next message
 *      this.myWebView.postMessage(event.nativeEvent.data);
 *
 *      let msgData;
 *      try {
 *          msgData = JSON.parse(event.nativeEvent.data);
 *      }
 *      catch(err) {
 *          console.warn(err);
 *          return;
 *      }
 *
 *      // invoke target function
 *      const response = this[msgData.targetFunc].apply(this, [msgData]);
 *      // trigger success callback
 *      msgData.isSuccessfull = true;
 *      msgData.args = [response];
 *      this.myWebView.postMessage(JSON.stringify(msgData))
 *  }
 *
 */
//

//
function debugLogDiv() {
    var id = 'wvb-debug-div';
    var div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
        div.id = id;
        div.style.position = 'fixed';
        div.style.zIndex = 99999;
        div.style.left = 0;
        div.style.bottom = 0;
        div.style.width = '100%';
        div.style.minHeight = '10';
        div.style.backgroundColor = 'yellow'
        div.style.color = 'black';
        // 
        document.body.appendChild(div);
    }
    return div;
}
//.end
//
function debugLog(msg) {
    // Init
    var cls = (debugLog = debugLog);
    // @var {number} idx 
    cls.del = cls.del || function(idx) {
        cls.msgs.splice(idx, 1);
        debugLog();
    };
    // @var {Array}
    cls.msgs = cls.msgs || [];
    //.end
    //
    var div = debugLogDiv();
    if (msg) {
        cls.msgs.push(msg);
    }
    var html = '<ul>';
    for (var i in cls.msgs) {
        var msgI = cls.msgs[i];
        html += ('<li>'
            + msgI
            + ' <a href="javascript:void(0);" onclick="debugLog.del(' + i + ');">x</a>'
            + '</li>'
        );
    }
    html += '</ul>';
    div.innerHTML = html;
}
//.end

/**
 * @class WebViewBridge
 */
function WebViewBridge() {
    /**
     * @var {Object}
     */
    this._callbacks = {};

    /**
     * 
     */
    this.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    this.guid = function () {
        return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
    };

    /**
     * Send message to the React-Native WebView onMessage handler
     * @param {mixed} data Data to pass
     * @param {Function} callback
     */
    this.send = function(data, callback) {
        // Format input
        var msgObj = (data = ((typeof data === 'object') ? data : {}));
        msgObj._id = this.guid();
        //
        try {
            if (typeof callback === 'function') {
                this._callbacks[msgObj._id] = callback;
            }
            msgObj = (typeof msgObj === 'string') ? msgObj : JSON.stringify(msgObj);
            window.postMessage(msgObj/*, '*'*/);
            debugLog('WVB sent: ' + msgObj);
        } catch (e) {
            debugLog('WVB send failed: ' + e.message);
        }
    };

    /**
     * 
     */
    (this._bindEvents = function () {
        document.addEventListener('message', function(e) {
            try {
                var msg = JSON.parse(e.data);
                // trigger callback?
                var callback = this._callbacks[msg._id];
                if (callback) {
                    callback(msg.error, msg);
                    delete this._callbacks[msg._id];
                }
            }
            catch(err) {
                debugLog("Failed to parse msg from react-native: " + err);
            }
        });
    })();
};

//
function WebViewComponent() {
    // return window.postMessage('"Hello" from the web view');
    var WVB = WebViewComponent.WVB = (WebViewComponent.WVB || new WebViewBridge());
    try {
        //
        WVB.send({
            type: 'web_info',
            document: {
                title: document.title,
                cookie: document.cookie
            },
            location: location,
            navigator: {
                vendor: navigator.vendor,
                vendorSub: navigator.vendorSub,
                userAgent: navigator.userAgent
            }
        }, function(err, res){
            debugLog('err: ' + JSON.stringify(err));
            debugLog('res: ' + JSON.stringify(res));
        });
        // debugLog('WebViewComp sent!');
        alert('WebViewComp sent!');
    } catch (e) {
        // debugLog('WebViewComponent err: ' + e.message);
        alert('WebViewComponent err: ' + e.message);
    }
    //.end
};

//
const injectedJavaScript = `(function(){
    return;
    /* Debug tools */
    ${debugLogDiv};
    ${debugLog};
    /*.end*/
    
    /* WebViewBridge */
    ${WebViewBridge};
    (${WebViewComponent})();
    /*.end*/
    debugLog('injectedJS is working..!');
})();`;
// console.log(injectedJavaScript);
// export default injectedJavaScript;

const script = `(function(){
    /* Debug tools */
    ${debugLogDiv};
    ${debugLog};
    /*.end*/

  var messagesReceivedFromReactNative = 0;
  document.addEventListener('message', function(e) {
    messagesReceivedFromReactNative += 1;
    document.getElementsByTagName('p')[0].innerHTML =
      'Messages received from React Native: ' + messagesReceivedFromReactNative;
    document.getElementsByTagName('p')[1].innerHTML = e.data;

    if (1 === messagesReceivedFromReactNative) {
        WebViewComponent();
    }
  });

  ${WebViewBridge};
  ${WebViewComponent};
  var button = document.getElementsByTagName('button')[0];
  button.click();
  button.addEventListener('click', function() {
    /* window.postMessage('"Hello" from the web view'); */
    WebViewComponent();
  });
    alert('before');
    WebViewComponent();
    alert('after');
})();`;
export default script;