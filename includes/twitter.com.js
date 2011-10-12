(function() {

if(window.location.hostname.indexOf('twitter.com') == 0) {
  window.document.addEventListener('DOMNodeInserted', deShortenURL, false);
}

function deShortenURL(event) {
  var link = event.srcElement.querySelector('a[data-expanded-url]');

  if(link && event.srcElement.getAttribute('class') == 'js-stream-item stream-item' || event.srcElement.getAttribute('class') == 'component') {
    link.firstChild.data = link.href;
    link.href = link.getAttribute('data-expanded-url');
  }
}

})();
