// ==UserScript==
// @include http://9gag.com/*
// ==/UserScript==

(function() {

window.document.addEventListener('DOMContentLoaded', bypass_nsfw_block, false);
window.document.addEventListener('DOMNodeInserted', bypass_nsfw_block, false);

function bypass_nsfw_block(event) {
  var imgs = document.getElementsByTagName("img");

  for(i = 0; i < imgs.length; i++) {
    var img = imgs[i];

    if(img.getAttribute("alt") == "NSFW") {
      var img_id = img.parentNode.getAttribute("href").split("/")[2];

      img.src = "http://d24w6bsrhbeh9d.cloudfront.net/photo/" + img_id + "_460s.jpg";
      img.removeAttribute("alt");
    }
  }
}

})();
