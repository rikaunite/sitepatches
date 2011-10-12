// ==UserScript==
// @include http://twitter.com/
// @include https://twitter.com/
// ==/UserScript==

(function() {

window.document.addEventListener('DOMNodeInserted', deShortenURL, false);

function deShortenURL(event) {
  var links = event.srcElement.querySelectorAll('a[data-expanded-url]');
  var nodeClass = event.srcElement.getAttribute('class');

  if(links && nodeClass == 'js-stream-item stream-item' || nodeClass == 'component') {
    for(var i = 0; i < links.length; i++) {
      var link = links[i];

      link.firstChild.data = link.href;
      link.href = link.getAttribute('data-expanded-url');
    }
  }
}

})();
