// ==UserScript==
// @include http://twitter.com/
// @include https://twitter.com/
// ==/UserScript==

(function() {

window.document.addEventListener('DOMNodeInserted', replace_url, false);

function replace_url(event) {
  var links = event.srcElement.querySelectorAll('a[data-expanded-url]');
  var node_class = event.srcElement.getAttribute('class');

  if(links.length > 0 && (node_class == 'stream-item-content tweet js-actionable-tweet js-stream-tweet stream-tweet  ' || node_class == 'js-stream-item stream-item' || node_class == 'component')) {
    for(var i = 0; i < links.length; i++) {
      var link = links[i];

      link.addEventListener('DOMAttrModified', replace_url_ultimate, false);
      link.firstChild.data = link.href;
      link.href = link.getAttribute('data-expanded-url');
    }
  }
}

function replace_url_ultimate(event) {
  if(event.attrName == 'data-ultimate-url') {
    var link = event.srcElement;
    var url = link.getAttribute(event.attrName);

    if(url[url.length-1] == '/') {
      link.href = url.substring(0, url.length-1);
    } else {
      link.href = url;
    }

    link.removeEventListener('DOMAttrModified', replace_url_ultimate, false);
  }
}

})();
