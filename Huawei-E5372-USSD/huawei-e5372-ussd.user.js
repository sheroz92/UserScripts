// ==UserScript==
// @name          Huawei E5372 branded USSD
// @namespace     http://dluciv.name/
// @description   Добавляется пункт для отправки произвольных USSD в меню GreaseMonkey для брендированных прошивок Huawei E5372 без USSD
// @author        dluciv
// @copyright     2015+, Dmitry V. Luciv
// @license       WTFPLv2; http://wtfpl.net
// @license       MIT; http://opensource.org/licenses/MIT
// @version       0.2.0
// @icon          https://raw.githubusercontent.com/dluciv/UserScripts/master/Huawei-E5372-USSD/ussd.png
// @homepage      https://github.com/dluciv/UserScripts/tree/master/Huawei-E5372-USSD
// @updateURL     https://raw.githubusercontent.com/dluciv/UserScripts/master/Huawei-E5372-USSD/huawei-e5372-ussd.user.js
// @downloadURL   https://raw.githubusercontent.com/dluciv/UserScripts/master/Huawei-E5372-USSD/huawei-e5372-ussd.user.js
//
// @grant         GM_registerMenuCommand
//
// @include       http://status.megafon.ru/*
// @include       http://192.168.8.1/*

// ==/UserScript==

(function() {
  var doall = function() {
    var ussd = window.prompt("Enter *USSD# code", "*100#");
    if(ussd != null) {
      unsafeWindow.sendCommonByUssd(ussd, "CodeType");
    }
  };
  var nop = function(){};
  GM_registerMenuCommand("-- Any USSD --", nop);
  GM_registerMenuCommand("USSD", doall, "u");

  GM_registerMenuCommand("-- Common replies --", nop);
  
  var comrep = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', '00', '000'
  ];
  for(var n=0; n < comrep.length; ++n){
    (function(nn){
      GM_registerMenuCommand("Reply " + nn, function(){
        unsafeWindow.sendCommonByUssd(nn, "CodeType");
      }, nn.length == 1 ? nn: null);
    })(comrep[n]);
  }
}).call(this);
