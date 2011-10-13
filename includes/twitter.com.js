// ==UserScript==
// @include http://twitter.com/
// @include https://twitter.com/
// ==/UserScript==

(function() {

window.document.addEventListener('DOMNodeInserted', replaceURL, false);

function replaceURL(event) {
  var links = event.srcElement.querySelectorAll('a[data-expanded-url]');
  var nodeClass = event.srcElement.getAttribute('class');

  if(links.length > 0 && (nodeClass == 'js-stream-item stream-item' || nodeClass == 'component')) {
    for(var i = 0; i < links.length; i++) {
      var link = links[i];

      link.addEventListener('DOMAttrModified', replaceToUltimateURL, false);
      link.firstChild.data = link.href;
      link.href = link.getAttribute('data-expanded-url');
    }
  }
}

function replaceToUltimateURL(event) {
  if(event.attrName == 'data-ultimate-url') {
    var link = event.srcElement;
    var url = link.getAttribute(event.attrName);

    if(url[url.length-1] == '/') {
      link.href = url.substring(0, url.length-1);
    } else {
      link.href = url;
    }

    link.removeEventListener('DOMAttrModified', replaceToUltimateURL, false);
  }
}

})();
