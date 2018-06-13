/**
 * Created by Guy Blank on 3/9/17.
 *
 *  This is a sample provides an API to send & receive messages to and from the React-Native WebView (using postMessage/onMessage WebView API).
 *  A sample project that uses the bridge is available here https://github.com/blankg/rn-webview-bridge-sample
 *
 *  webViewBridgevt.send('functionToInvoke', {mydata: 'test'}, function(){debugLog('success')},function(){debugLog('error')});
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
 *          consolevt.warn(err);
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
        div.style.fontSize = '80%';
        div.style.maxHeight = '150px';
        div.style.overflow = 'scroll';
        // 
        document.body.appendChild(div);
    }
    return div;
}
//.end
//
function debugLog(msg) {
    // Init
    var cls = (window.debugLog = debugLog);
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
    // Self assign;
    var self = this;
    /**
     * @var {Object}
     */
    self._callbacks = {};

    /**
     * 
     */
    self.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    self.guid = function () {
        // return self.s4() + self.s4() + "-" + self.s4() + "-" + self.s4() + "-" + self.s4() + "-" + self.s4() + self.s4() + self.s4();
        return ((new Date()).getTime() + Math.random()).toString();
    };

    /**
     * Send message to the React-Native WebView onMessage handler
     * @param {mixed} data Data to pass
     * @param {Function} callback
     */
    self.send = function(data, callback) {
        // Format input
        var msgObj = (data = ((typeof data === 'object') ? data : {}));
        msgObj._id = self.guid();
        //
        try {
            if (typeof callback === 'function') {
                self._callbacks[msgObj._id] = callback;
            }
            msgObj = (typeof msgObj === 'string') ? msgObj : JSON.stringify(msgObj);
            window.postMessage(msgObj);
            debugLog('WVB sent: ' + msgObj);
        } catch (err) {
            debugLog('WVB send failed: ' + err.message);
        }
    };

    /**
     * 
     */
    (self._bindEvents = function () {
        document.addEventListener('message', function(evt) {
            try {
                var msg = JSON.parse(evt.data);
                // trigger callback?
                var callback = self._callbacks[msg._id];
                if (callback) {
                    callback(msg.error, msg);
                    delete self._callbacks[msg._id];
                }
                debugLog("msg from react-native: " + evt.data);
            } catch(err) {
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
            type: 'webpage_info',
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
    } catch (err) {
        debugLog('WebViewComponent err: ' + err.message);
    }
    //.end
};

//
const injectedJavaScript = `(function(){
    /* Debug tools */
    ${debugLogDiv};
    ${debugLog};
    /*.end*/
    /* WebViewBridge */
    ${WebViewBridge};
    ${WebViewComponent};
    /*.end*/
    
    debugLog('injectedJS is working..!');
})();`;
// consolevt.log(injectedJavaScript);
export default injectedJavaScript;