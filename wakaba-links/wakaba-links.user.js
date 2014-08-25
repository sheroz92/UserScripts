// ==UserScript==
// @name          Wakaba Reply Links
// @namespace     http://dluciv.name/
// @description   Wakaba Reply Links. Click pastes >>... link to reply form, context menu allows to copy URL with #... reply reference
// @namespace     http://dluciv.name/
// @copyright     2014+, Dmitry V. Luciv
// @license       WTFPLv2; http://wtfpl.net
// @license       MIT; http://opensource.org/licenses/MIT
// @version       0.0.0.6
// @homepage      https://github.com/dluciv/UserScripts/tree/master/wakaba-links
// @icon          https://raw.githubusercontent.com/dluciv/UserScripts/master/wakaba-links/unyl-chan.png
// @updateURL     https://raw.githubusercontent.com/dluciv/UserScripts/master/wakaba-links/wakaba-links.user.js
// @downloadURL   https://raw.githubusercontent.com/dluciv/UserScripts/master/wakaba-links/wakaba-links.user.js
// @grant         none
// @include       http://iichan.hk/*
// ==/UserScript==

try {
    var replies = document.querySelectorAll('td[id^="reply"]');
    for(var nreply = 0; nreply < replies.length; nreply++)
    {
	var reply = replies[nreply];
	var rlhref = reply.querySelector('span.reflink a[href^="javascript:insert("]');
	var rid = reply.getAttribute('id').replace('reply', '');
	rlhref.setAttribute('href', "#" + rid);
	(function(){ // yes, JS is so mutable...
	    var _rid = rid; // so we need this
	    rlhref.addEventListener('click', function(e) {
		e.preventDefault();
		window.insert(">>" + _rid); // do as before
	    });
	})();
    }
} catch(e) {
    console.log(e);
}
