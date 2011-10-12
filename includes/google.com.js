// ==UserScript==
// @include http://www.google.*/*
// @include https://encrypted.google.com/*
// ==/UserScript==

(function() {

window.opera.defineMagicFunction(
  'rwt',
  function() {
    return true;
  }
);

})();
