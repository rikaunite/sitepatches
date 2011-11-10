// ==UserScript==
// @include http://www.google.*/search*
// @include https://www.google.*/search*
// ==/UserScript==

(function() {

window.opera.defineMagicFunction(
  'rwt',
  function() {
    return true;
  }
);

})();
