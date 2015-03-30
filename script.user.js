// ==UserScript==
// @name        topface
// @namespace   top_face
// @description popup cleaner
// @include     http://topface.com/*
// @version     1
// @grant       none
// ==/UserScript==

function addCss(cssString) {
  var head = document.getElementsByTagName('head')[0];
  if( !head ) return;
  var newCss = document.createElement('style');
  newCss.type = 'text/css';
  newCss.innerHTML = cssString;
  head.appendChild(newCss);
}
addCss('#popup_004, .plashka-box.plashka-fb.premium, .messenger-contact-list-contacts-item--rich-and-sexy, .rich-and-sexy-banner-for-m , #popup_002, .tf-overlay, .notification-type-richAndSexyAd {display: none!important}');

// alert('Done!')
