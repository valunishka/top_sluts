// ==UserScript==
// @name        topface
// @namespace   top_face
// @description popup cleaner
// @include     http://topface.com/*
// @version     1
// @grant       none
// @updateURL https://raw.githubusercontent.com/valunishka/top_sluts/master/script.user.js
// ==/UserScript==
(function() {
	var clickerInterval;

	function addCss(cssString) {
	  var head = document.getElementsByTagName('head')[0];
	  if( !head ) return;
	  var newCss = document.createElement('style');
	  newCss.type = 'text/css';
	  newCss.innerHTML = cssString;
	  head.appendChild(newCss);
	};

	var filterLikers = function() {
		var cache = {},
			authorId,
			count = 0;

		$.each(document.querySelectorAll('.commentContainer'), function( index, item ) {
			authorId = item.dataset.author_id;
			if( cache[ authorId ] ) {
				item.querySelector('.press-hate').click();
			}

			if(!cache[ authorId ]) cache[ authorId ] = 1;
		});

	};

	var toggleAutoClick = function() {

		if ( clickerInterval ) {
			clearInterval( clickerInterval );
			clickerInterval = null;
			return;
		}

		clickerInterval = setInterval(function() {
			document.querySelector('.dating-button-sympathy').click();
		}, 500);
	};

	$('body').append($('<button class="standard-button button-blue sluts-likes-filter-button">Filter likes!</button>'));
	$('body').append($('<button class="standard-button button-blue toggle-autoliker"><span class="start-index">Start</span><span class="stop-index">Stop</span> liking </button>'));
	$('.sluts-likes-filter-button').on('click', function( event ) {
		event.preventDefault();
		event.stopPropagation();
		filterLikers();
	});

	$('.toggle-autoliker').on('click', function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$(this).toggleClass('active');
		toggleAutoClick();
	});

	addCss('#popup_004, #leadersLayout, .lock-like-info, .plashka-box.plashka-fb.premium, .messenger-contact-list-contacts-item--rich-and-sexy, .rich-and-sexy-banner-for-m , #popup_002, .tf-overlay, .notification-type-richAndSexyAd {display: none!important} .toggle-autoliker, .sluts-likes-filter-button{display:block;position:fixed;bottom:0;right:100px} .toggle-autoliker{bottom:40px;} .toggle-autoliker.active .stop-index{display:inline} .stop-index, .toggle-autoliker.active .start-index {display:none;}');

})();
