// ==UserScript==
// @name         Even Better ADC
// @namespace    https://dluciv.name/
// @version      0.2.0
// @description  Неужели ADC может быть ещё лучше и удобнее? Да, с этим скриптом может.
// @author       Dmitry V. Luciv
// @icon         https://raw.githubusercontent.com/dluciv/UserScripts/master/adc.spbu.ru/spbu-icon.png
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @match        https://adc.spbu.ru/*
// @grant        GM_registerMenuCommand
// @license      WTFPLv2 http://wtfpl.net/
// @homepage     https://github.com/dluciv/UserScripts/tree/master/adc.spbu.ru
// @updateURL    https://raw.githubusercontent.com/dluciv/UserScripts/master/adc.spbu.ru/even-better-adc.user.js
// @downloadURL  https://raw.githubusercontent.com/dluciv/UserScripts/master/adc.spbu.ru/even-better-adc.user.js
// ==/UserScript==

(function() {'use strict'; $(function() {

    let invertTRs = function(what){
        let trs = $('tr.dxgvDataRow_XafTheme');
        let desiredTRs = what === null ? trs : trs.find(`:contains('${what}')`).closest('tr');
        desiredTRs.find('.dxICheckBox_XafTheme:first').parent().trigger('click');
    };

    let invertSelection = function(){
        invertTRs(null);
    };

    let invertContaining = function(){
        invertTRs(prompt("Что содержит?"));
    };

    let deleteSelected = function(){
        let imgs = $(
            $('tr.dxgvDataRow_XafTheme').
            find('td:first').find('.dxWeb_edtCheckBoxChecked_XafTheme').
            closest('tr').find('a:first').find('img:first').
            get().reverse()
        );
        imgs.trigger('click');
    };

    GM_registerMenuCommand("Инвертировать выделение", invertSelection, null);
    GM_registerMenuCommand("Инвертировать содержащие", invertContaining, null);
    GM_registerMenuCommand("Отменить выделенное", deleteSelected, null);
})})();