// @var {Function}
function _() {
  // @see https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
  function windowScrollInfo() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    // Return
    return { "left": left, "top": top };
  }
  //
  document.addEventListener('scroll', function() {
    window.postMessage(JSON.stringify({
      "type": "__WebViewOnScroll",
      scroll: windowScrollInfo()
    }));
  });
}
// @var {Function}
export default function injectedJS() {
  return `(${_})();`;
};
