// ==UserScript==
// @name          Huawei E5372 branded USSD
// @namespace     http://dluciv.name/
// @description   Добавляется пункт для отправки произвольных USSD в меню GreaseMonkey для брендированных прошивок Huawei E5372 без USSD
// @author        dluciv
// @copyright     2015+, Dmitry V. Luciv
// @license       WTFPLv2; http://wtfpl.net
// @license       MIT; http://opensource.org/licenses/MIT
// @version       0.1.2
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
      window.sendCommonByUssd(ussd, "CodeType");
    }
  };
  GM_registerMenuCommand("USSD", doall);
}).call(this);
