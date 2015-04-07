// ==UserScript==
// @name        topface
// @namespace   top_face
// @description popup cleaner
// @include     http://topface.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
	var clickerInterval,
		settings = null,
		messageTemplate = null;

	var addCss = function ( cssString ) {
		var head = document.getElementsByTagName('head')[0];
		if( !head ) return;
		var newCss = document.createElement('style');
		newCss.type = 'text/css';
		newCss.innerHTML = cssString;
		head.appendChild(newCss);
	};

	var stopEvent = function( event ) {
		event.preventDefault();
		event.stopPropagation();
	};

	var filterLikers = function() {
		console.log('Filter this!');
		var cache = {},
			authorId,
			count = 0;

		$.each(document.querySelectorAll('.commentContainer'), function( index, item ) {
			authorId = item.dataset.author_id;
			if( cache[ authorId ] ) {
				item.querySelector('.press-hate').click();
				count++;
				return;
			}

			if(!cache[ authorId ]) cache[ authorId ] = 1;
		});

		console.log(count, ' girls has been deleted');

	};

	var toggleAutoClick = function( context ) {

		if ( window.location.pathname !== '/dating/type/all/' ) {
			alert('It\'s wrong page. Go to search.');
			return;
		}

		$(context).toggleClass('active');

		if ( clickerInterval ) {
			clearInterval( clickerInterval );
			clickerInterval = null;
			return;
		}

		clickerInterval = setInterval(function() {
			document.querySelector('.dating-button-sympathy').click();
		}, 500);
	};

	var renderUi = function() {

		$('body')
			.append($('<button class="standard-button button-blue sluts-likes-filter-button">Filter likes!</button>'))
			.append($('<button class="standard-button button-blue toggle-autoliker"><span class="start-index">Start</span><span class="stop-index">Stop</span> liking </button>'))
			.append($('<button class="standard-button button-blue show-spam-form-button">Send spam </button>'))
			.append($('<div class="spam-message-form hidden"> <textarea name="spam-message-body" cols="30" rows="10" class="spam-message-body"> Доступна шаблонизация имени жертвы: {{username}}	</textarea> <button class="send-spam-button">Send!</button> </div>'));

	};

	var toggleSpamMessageForm = function() {
		$('.spam-message-form').toggleClass('hidden');
	};

	var getSpamMessageText = function( item ) {
		if ( !messageTemplate ) messageTemplate = document.querySelector('.spam-message-body').value;
		return $.trim( messageTemplate.replace(/{{username}}/, item.dataset.name) );
	};

	var sendSpamMessages = function() {

		var message = '';

		console.log('Send spam');

		$('.commentContainer').each(function( index, item ) {
			message = getSpamMessageText( item );
			item.querySelector('.symp-message-text').value = message;
			item.querySelector('.chat-from-symp-button').click();
		});

	};

	var initializeHandlers = function() {

		$('.sluts-likes-filter-button').on('click', function( event ) {
			stopEvent( event );
			filterLikers();
		});

		$('.toggle-autoliker').on('click', function( event ) {
			stopEvent( event );
			toggleAutoClick( this );
		});

		$('.show-spam-form-button').on('click', function( event ) {
			stopEvent( event );
			toggleSpamMessageForm();
		});

		$('.send-spam-button').on('click', function( event ) {
			stopEvent( event );
			sendSpamMessages();
		});

	};

	var addCssRules = function() {
		addCss('.notification-container-inner, .plashka-box.plashka-fb.points, #popup_004, #leadersLayout, .lock-like-info, .plashka-box.plashka-fb.premium, .messenger-contact-list-contacts-item--rich-and-sexy, .rich-and-sexy-banner-for-m , #popup_002, .tf-overlay, .notification-type-richAndSexyAd {display: none!important} .toggle-autoliker, .sluts-likes-filter-button, .show-spam-form-button {display:block;position:fixed;bottom:0;right:100px} .toggle-autoliker{bottom:40px;} .toggle-autoliker.active .stop-index{display:inline} .stop-index, .toggle-autoliker.active .start-index {display:none;} .show-spam-form-button{bottom:80px} .spam-message-form{  position: fixed; bottom: 20px; right: 211px; width: 200px; padding: 10px; z-index: 2; background: #71A7E8; border-radius: 4px;}');
	};

	var init = function() {
		renderUi();
		initializeHandlers();
		addCssRules();

		console.log('Top-sluts tool initialized');
	};

	init();

})();
