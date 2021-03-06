﻿// ==UserScript==
// @include http://twitter.com/*
// @include https://twitter.com/*
// ==/UserScript==

var DISPLAY_EXPANDED_URL = false;

(function() {

window.document.addEventListener('DOMContentLoaded', replace_url_loaded, false);
window.document.addEventListener('DOMNodeInserted', replace_url, false);

function replace_url_common(link) {
  link.querySelector('span.js-display-url').firstChild.data = DISPLAY_EXPANDED_URL ? link.getAttribute('data-expanded-url') : link.href;
  link.removeChild(link.querySelector('span.tco-ellipsis'));
  link.href = link.getAttribute('data-expanded-url');
}

function replace_url_loaded(event) {
  var links = event.srcElement.querySelectorAll('a[data-expanded-url]');

  if(links.length > 0) {
    for(var i = 0; i < links.length; i++) {
      var link = links[i];

      replace_url_common(link);
    }
  }
}

function replace_url(event) {
  var links = event.srcElement.querySelectorAll('a[data-expanded-url]');

  if(links.length > 0) {
    for(var i = 0; i < links.length; i++) {
      var link = links[i];

      if(link.querySelectorAll('span').length > 0) {
        replace_url_common(link);
      } else if(event.srcElement.getAttribute('class').search(/expanding-stream-item/)) {
        if(link.href != link.getAttribute('data-expanded-url')) {
          if(!link.getAttribute('data-ultimate-url')) {
            link.addEventListener('DOMAttrModified', replace_url_ultimate, false);
            link.firstChild.data = DISPLAY_EXPANDED_URL ? link.getAttribute('data-expanded-url') : link.href;
            link.href = link.getAttribute('data-expanded-url');
          }
        }
      }
    }
  }
}

function replace_url_ultimate(event) {
  if(event.attrName == 'data-ultimate-url') {
    var link = event.srcElement;
    var url = link.getAttribute(event.attrName);

    if(url[url.length-1] == '/') {
      link.href = url.substring(0, url.length-1);
      if(DISPLAY_EXPANDED_URL) { link.firstChild.data = url.substring(0, url.length-1); }
    } else {
      link.href = url;
      if(DISPLAY_EXPANDED_URL) { link.firstChild.data = url; }
    }

    link.removeEventListener('DOMAttrModified', replace_url_ultimate, false);
  }
}

})();
