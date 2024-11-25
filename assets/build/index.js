/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/js/frontend/blockquote.js":
/*!**********************************************!*\
  !*** ./assets/src/js/frontend/blockquote.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);



function getComputedStyleProperty(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

function rgbToHex(rgbString) {
    const [r, g, b] = rgbString
        .substring(rgbString.indexOf('(') + 1, rgbString.lastIndexOf(')'))
        .split(',')
        .map((color) => parseInt(color.trim(), 10));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function getBorderLeftColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-left-color');
}

function getBorderRightColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-right-color');
}

function getBorderTopColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-top-color');
}

function getBorderBottomColor(blockquoteElement) {
    return getComputedStyleProperty(blockquoteElement, 'border-bottom-color');
}

document.addEventListener('DOMContentLoaded', () => {
    const customBlockQuotes = document.querySelectorAll('.wp-block-quote.is-style-custom');
    if (customBlockQuotes.length > 0) {
        customBlockQuotes.forEach((customBlockQuote, index) => {
            // Execute your logic for each element
            listCiteElements(customBlockQuote);

            if (typeof wp !== 'undefined' && typeof wp.data !== 'undefined' && typeof wp.blocks !== 'undefined') {

                // Listen for block selection changes and update the CSS variable
                try {
                    wp.data.subscribe(() => {
                        listCiteElements(customBlockQuote);
                        //console.log(`Successfully listened to quote ${index + 1}`);
                    });
                } catch (error) {
                    //console.error(`Failed to subscribe to data changes for quote ${index + 1}:`, error);
                }
            }
        });
    }
    function listCiteElements(customBlockQuote) {
        const citeElements = document.querySelectorAll('.wp-block-quote.is-style-custom > cite');
        citeElements.forEach((citeElement, index) => {
            const citeColor = rgbToHex(getComputedStyleProperty(citeElement, 'color'));
            const blockquoteElement = citeElement.closest('.wp-block-quote');
            let borderciteColor;

            switch (true) {
                case blockquoteElement.classList.contains('has-text-align-right'):
                    borderciteColor = getBorderRightColor(blockquoteElement);
                    blockquoteElement.style.borderRightColor = citeColor;
                    break;
                case blockquoteElement.classList.contains('has-text-align-center'):
                    borderciteColor = getBorderTopColor(blockquoteElement);
                    blockquoteElement.style.borderTopColor = citeColor;
                    borderciteColor = getBorderBottomColor(blockquoteElement);
                    blockquoteElement.style.borderBottomColor = citeColor;
                    break;
                case blockquoteElement.classList.contains('has-text-align-left'):
                    borderciteColor = getBorderLeftColor(blockquoteElement);
                    blockquoteElement.style.borderLeftColor = citeColor;
                    break;
                default:
                    // For wp-block-quote.is-style-custom and has-text-align-left
                    borderciteColor = getBorderLeftColor(blockquoteElement);
                    blockquoteElement.style.borderLeftColor = citeColor;
                    break;
            }
            // console.log(`Cite Element ${index + 1}: Content: ${citeElement.textContent}, Color: ${citeColor}, Border Color: ${borderciteColor}`);
        });
    }


    //align blockquote content to center 
    const blockquoteCenter = document.querySelectorAll('.wp-block-quote.has-text-align-center');

    for (let i = 0; i < blockquoteCenter.length; i++) {
        const blockquoteCenterP = blockquoteCenter[i].querySelector('p');
        const blockquoteCenterCite = blockquoteCenter[i].querySelector('cite');

        blockquoteCenterP.setAttribute("class", "has-text-align-center");
        blockquoteCenterCite.setAttribute("class", "has-text-align-center");
    }

    //align blockquote content to right 
    const blockquoteRight = document.querySelectorAll('.wp-block-quote.has-text-align-right');

    for (let i = 0; i < blockquoteRight.length; i++) {
        const blockquoteRightP = blockquoteRight[i].querySelector('p');
        const blockquoteRightCite = blockquoteRight[i].querySelector('cite');

        blockquoteRightP.setAttribute("class", "has-text-align-right");
        blockquoteRightCite.setAttribute("class", "has-text-align-right");
    }

});

try {
    if (typeof wp !== 'undefined' && wp.blocks) {
        // Block Style Registration
        wp.blocks.registerBlockStyle('core/quote', [
            {
                name: 'custom',
                label: 'Custom',
                isDefault: false,
                inlineStyle: {
                    color: 'inherit',
                    'font-size': 'inherit',
                    'border-left': '4px solid inherit',
                    padding: '0.2rem 0 0.2rem 1rem',
                    position: 'relative',
                },
            },
        ]);
    }
} catch (error) {
   // console.error('Failed to register block style', error);
}

/***/ }),

/***/ "./assets/src/js/frontend/externaltools.js":
/*!*************************************************!*\
  !*** ./assets/src/js/frontend/externaltools.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
//Adding the Optimonk scripts
//Version 1.1
window.addEventListener('DOMContentLoaded', (event) => {
  pathnameUrl();

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark": {
        jQuery('<script id="optimonkDK" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118834"); </' + 'script>').appendTo(document.body);
        // new A/B testing tool
        let vwoCode = '<link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />';
        vwoCode += '<script type=\'text/javascript\' id=\'vwoCode\'>';
        vwoCode += 'window._vwo_code || (function() { var account_id=835229, version=2.0, settings_tolerance=2000, hide_element=\'body\', hide_element_style = \'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important\', /* DO NOT EDIT BELOW THIS LINE */ f=false,w=window,d=document,v=d.querySelector(\'#vwoCode\'),cK=\'_vwo_\'+account_id+\'_settings\',cc={}; try{var c=JSON.parse(localStorage.getItem(\'_vwo_\'+account_id+\'_config\'));cc=c&&typeof c===\'object\'?c:{}}catch(e){} var stT=cc.stT===\'session\'?w.sessionStorage:w.localStorage; code={use_existing_jquery:function(){return typeof use_existing_jquery!==\'undefined\'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!==\'undefined\'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return\'{\'+(cc.hES||hide_element_style)+\'}\'},hide_element:function(){return typeof cc.hE===\'string\'?cc.hE:hide_element},getVersion:function(){return version},finish:function(){if(!f){f=true;var e=d.getElementById(\'_vis_opt_path_hides\');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=this.getSettings(),n=d.createElement(\'script\'),i=this;if(t){n.textContent=t;d.getElementsByTagName(\'head\')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);i.load(e)}}else{n.fetchPriority=\'high\';n.src=e;n.type=\'text/javascript\';n.onerror=function(){_vwo_code.finish()};d.getElementsByTagName(\'head\')[0].appendChild(n)}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf(\'__vwo_disable__\')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t=d.currentScript,n=d.createElement(\'style\'),i=this.hide_element(),r=t&&!t.async&&i?i+this.hide_element_style():\'\',c=d.getElementsByTagName(\'head\')[0];n.setAttribute(\'id\',\'_vis_opt_path_hides\');v&&n.setAttribute(\'nonce\',v.nonce);n.setAttribute(\'type\',\'text/css\');if(n.styleSheet)n.styleSheet.cssText=r;else n.appendChild(d.createTextNode(r));c.appendChild(n);this.load(\'https://dev.visualwebsiteoptimizer.com/j.php?a=\'+account_id+\'&u=\'+encodeURIComponent(d.URL)+\'&vn=\'+version)}};w._vwo_code=code;code.init();})();';
        vwoCode += '</script>';
        jQuery('head').append(vwoCode);

        break;
      }
      case "finland": {
        jQuery('<script id="optimonkFI" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118832"); </' + 'script>').appendTo(document.body);
        // new A/B testing tool
        let vwoCode = '<link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />';
        vwoCode += '<script type=\'text/javascript\' id=\'vwoCode\'>';
        vwoCode += 'window._vwo_code || (function() { var account_id=835229, version=2.0, settings_tolerance=2000, hide_element=\'body\', hide_element_style = \'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important\', /* DO NOT EDIT BELOW THIS LINE */ f=false,w=window,d=document,v=d.querySelector(\'#vwoCode\'),cK=\'_vwo_\'+account_id+\'_settings\',cc={}; try{var c=JSON.parse(localStorage.getItem(\'_vwo_\'+account_id+\'_config\'));cc=c&&typeof c===\'object\'?c:{}}catch(e){} var stT=cc.stT===\'session\'?w.sessionStorage:w.localStorage; code={use_existing_jquery:function(){return typeof use_existing_jquery!==\'undefined\'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!==\'undefined\'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return\'{\'+(cc.hES||hide_element_style)+\'}\'},hide_element:function(){return typeof cc.hE===\'string\'?cc.hE:hide_element},getVersion:function(){return version},finish:function(){if(!f){f=true;var e=d.getElementById(\'_vis_opt_path_hides\');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=this.getSettings(),n=d.createElement(\'script\'),i=this;if(t){n.textContent=t;d.getElementsByTagName(\'head\')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);i.load(e)}}else{n.fetchPriority=\'high\';n.src=e;n.type=\'text/javascript\';n.onerror=function(){_vwo_code.finish()};d.getElementsByTagName(\'head\')[0].appendChild(n)}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf(\'__vwo_disable__\')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t=d.currentScript,n=d.createElement(\'style\'),i=this.hide_element(),r=t&&!t.async&&i?i+this.hide_element_style():\'\',c=d.getElementsByTagName(\'head\')[0];n.setAttribute(\'id\',\'_vis_opt_path_hides\');v&&n.setAttribute(\'nonce\',v.nonce);n.setAttribute(\'type\',\'text/css\');if(n.styleSheet)n.styleSheet.cssText=r;else n.appendChild(d.createTextNode(r));c.appendChild(n);this.load(\'https://dev.visualwebsiteoptimizer.com/j.php?a=\'+account_id+\'&u=\'+encodeURIComponent(d.URL)+\'&vn=\'+version)}};w._vwo_code=code;code.init();})();';
        vwoCode += '</script>';
        jQuery('head').append(vwoCode);

        break;
      }
      case "norway": {
        jQuery('<script id="optimonkNO" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t);})(document,"118833"); </' + 'script>').appendTo(document.body);
        //adding the insamlingskontrollen logo in the footer
        const lastChild = document.querySelector('.footer-menu > .list-unstyled').lastElementChild;
        lastChild.insertAdjacentHTML('afterend', '<li><a href="https://www.innsamlingskontrollen.no/organisasjoner/foreningen-greenpeace-norden/" target="_blank"><img src="https://storage.googleapis.com/lib.greenpeace.se/apps/Insamlingskontrollen.svg" alt="Innsamlingskontrollen Foreningen Greenpeace Norden" style="width: 4.5rem; position: initial;"></a></li>');
        // new A/B testing tool
        let vwoCode = '<link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />';
        vwoCode += '<script type=\'text/javascript\' id=\'vwoCode\'>';
        vwoCode += 'window._vwo_code || (function() { var account_id=835229, version=2.0, settings_tolerance=2000, hide_element=\'body\', hide_element_style = \'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important\', /* DO NOT EDIT BELOW THIS LINE */ f=false,w=window,d=document,v=d.querySelector(\'#vwoCode\'),cK=\'_vwo_\'+account_id+\'_settings\',cc={}; try{var c=JSON.parse(localStorage.getItem(\'_vwo_\'+account_id+\'_config\'));cc=c&&typeof c===\'object\'?c:{}}catch(e){} var stT=cc.stT===\'session\'?w.sessionStorage:w.localStorage; code={use_existing_jquery:function(){return typeof use_existing_jquery!==\'undefined\'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!==\'undefined\'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return\'{\'+(cc.hES||hide_element_style)+\'}\'},hide_element:function(){return typeof cc.hE===\'string\'?cc.hE:hide_element},getVersion:function(){return version},finish:function(){if(!f){f=true;var e=d.getElementById(\'_vis_opt_path_hides\');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=this.getSettings(),n=d.createElement(\'script\'),i=this;if(t){n.textContent=t;d.getElementsByTagName(\'head\')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);i.load(e)}}else{n.fetchPriority=\'high\';n.src=e;n.type=\'text/javascript\';n.onerror=function(){_vwo_code.finish()};d.getElementsByTagName(\'head\')[0].appendChild(n)}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf(\'__vwo_disable__\')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t=d.currentScript,n=d.createElement(\'style\'),i=this.hide_element(),r=t&&!t.async&&i?i+this.hide_element_style():\'\',c=d.getElementsByTagName(\'head\')[0];n.setAttribute(\'id\',\'_vis_opt_path_hides\');v&&n.setAttribute(\'nonce\',v.nonce);n.setAttribute(\'type\',\'text/css\');if(n.styleSheet)n.styleSheet.cssText=r;else n.appendChild(d.createTextNode(r));c.appendChild(n);this.load(\'https://dev.visualwebsiteoptimizer.com/j.php?a=\'+account_id+\'&u=\'+encodeURIComponent(d.URL)+\'&vn=\'+version)}};w._vwo_code=code;code.init();})();';
        vwoCode += '</script>';
        jQuery('head').append(vwoCode);

        break;
      }
      case "sweden": {
        jQuery('<script id="optimonkSE" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"112168"); </' + 'script>').appendTo(document.body);
        // new A/B testing tool
        let vwoCode = '<link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />';
        vwoCode += '<script type=\'text/javascript\' id=\'vwoCode\'>';
        vwoCode += 'window._vwo_code || (function() { var account_id=835229, version=2.0, settings_tolerance=2000, hide_element=\'body\', hide_element_style = \'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important\', /* DO NOT EDIT BELOW THIS LINE */ f=false,w=window,d=document,v=d.querySelector(\'#vwoCode\'),cK=\'_vwo_\'+account_id+\'_settings\',cc={}; try{var c=JSON.parse(localStorage.getItem(\'_vwo_\'+account_id+\'_config\'));cc=c&&typeof c===\'object\'?c:{}}catch(e){} var stT=cc.stT===\'session\'?w.sessionStorage:w.localStorage; code={use_existing_jquery:function(){return typeof use_existing_jquery!==\'undefined\'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!==\'undefined\'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return\'{\'+(cc.hES||hide_element_style)+\'}\'},hide_element:function(){return typeof cc.hE===\'string\'?cc.hE:hide_element},getVersion:function(){return version},finish:function(){if(!f){f=true;var e=d.getElementById(\'_vis_opt_path_hides\');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=this.getSettings(),n=d.createElement(\'script\'),i=this;if(t){n.textContent=t;d.getElementsByTagName(\'head\')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);i.load(e)}}else{n.fetchPriority=\'high\';n.src=e;n.type=\'text/javascript\';n.onerror=function(){_vwo_code.finish()};d.getElementsByTagName(\'head\')[0].appendChild(n)}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf(\'__vwo_disable__\')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t=d.currentScript,n=d.createElement(\'style\'),i=this.hide_element(),r=t&&!t.async&&i?i+this.hide_element_style():\'\',c=d.getElementsByTagName(\'head\')[0];n.setAttribute(\'id\',\'_vis_opt_path_hides\');v&&n.setAttribute(\'nonce\',v.nonce);n.setAttribute(\'type\',\'text/css\');if(n.styleSheet)n.styleSheet.cssText=r;else n.appendChild(d.createTextNode(r));c.appendChild(n);this.load(\'https://dev.visualwebsiteoptimizer.com/j.php?a=\'+account_id+\'&u=\'+encodeURIComponent(d.URL)+\'&vn=\'+version)}};w._vwo_code=code;code.init();})();';
        vwoCode += '</script>';
        jQuery('head').append(vwoCode);

        break;
      }
      default: {
        jQuery('<script id="optimonkDEV" type="text/javascript"> console.log("Default case"); </' + 'script>').appendTo(document.body);
        // new A/B testing tool
        let vwoCode = '<link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />';
        vwoCode += '<script type=\'text/javascript\' id=\'vwoCode\'>';
        vwoCode += 'window._vwo_code || (function() { var account_id=835229, version=2.0, settings_tolerance=2000, hide_element=\'body\', hide_element_style = \'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important\', /* DO NOT EDIT BELOW THIS LINE */ f=false,w=window,d=document,v=d.querySelector(\'#vwoCode\'),cK=\'_vwo_\'+account_id+\'_settings\',cc={}; try{var c=JSON.parse(localStorage.getItem(\'_vwo_\'+account_id+\'_config\'));cc=c&&typeof c===\'object\'?c:{}}catch(e){} var stT=cc.stT===\'session\'?w.sessionStorage:w.localStorage; code={use_existing_jquery:function(){return typeof use_existing_jquery!==\'undefined\'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!==\'undefined\'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return\'{\'+(cc.hES||hide_element_style)+\'}\'},hide_element:function(){return typeof cc.hE===\'string\'?cc.hE:hide_element},getVersion:function(){return version},finish:function(){if(!f){f=true;var e=d.getElementById(\'_vis_opt_path_hides\');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=this.getSettings(),n=d.createElement(\'script\'),i=this;if(t){n.textContent=t;d.getElementsByTagName(\'head\')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);i.load(e)}}else{n.fetchPriority=\'high\';n.src=e;n.type=\'text/javascript\';n.onerror=function(){_vwo_code.finish()};d.getElementsByTagName(\'head\')[0].appendChild(n)}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf(\'__vwo_disable__\')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t=d.currentScript,n=d.createElement(\'style\'),i=this.hide_element(),r=t&&!t.async&&i?i+this.hide_element_style():\'\',c=d.getElementsByTagName(\'head\')[0];n.setAttribute(\'id\',\'_vis_opt_path_hides\');v&&n.setAttribute(\'nonce\',v.nonce);n.setAttribute(\'type\',\'text/css\');if(n.styleSheet)n.styleSheet.cssText=r;else n.appendChild(d.createTextNode(r));c.appendChild(n);this.load(\'https://dev.visualwebsiteoptimizer.com/j.php?a=\'+account_id+\'&u=\'+encodeURIComponent(d.URL)+\'&vn=\'+version)}};w._vwo_code=code;code.init();})();';
        vwoCode += '</script>';
        jQuery('head').append(vwoCode);
      }
    }
  }
});


/***/ }),

/***/ "./assets/src/js/frontend/gfquiz.js":
/*!******************************************!*\
  !*** ./assets/src/js/frontend/gfquiz.js ***!
  \******************************************/
/***/ (function() {

document.addEventListener('DOMContentLoaded', function () {
    let gform = document.querySelector('.gform_wrapper');
    let questions = document.querySelectorAll('.gfield--type-quiz[data-field-class="gquiz-field"]');
    const submitButton = document.getElementById('gform_submit_button_1');

    if (gform) {
        // Show only the first question
        questions[0].classList.add('active');
        updateButtonStates();

        // Loop through questions to append buttons
        questions.forEach(function (question, index) {
            const btnPrev = document.createElement('a');
            btnPrev.classList.add('btn-prev', 'pr-3', 'mr-3');
            btnPrev.innerHTML = '<i class="fas fa-arrow-left"></i>';
            btnPrev.addEventListener('click', function () {
                console.log('Previous button clicked');
                navigateQuestions(index - 1);
            });
            question.appendChild(btnPrev);

            const btnNext = document.createElement('a');
            btnNext.classList.add('btn-next', 'px-4', 'mr-3');
            btnNext.innerHTML = '<i class="fas fa-arrow-right"></i>';
            btnNext.addEventListener('click', function () {
                console.log('Next button clicked');
                navigateQuestions(index + 1);
            });
            question.appendChild(btnNext);
        });

        // Hide submit button initially
        submitButton.style.display = 'none';

        function updateButtonStates() {
            const currentIndex = getCurrentIndex(questions, 'active');
            questions.forEach(function (question, index) {
                const btnPrev = question.querySelector('.btn-prev');
                const btnNext = question.querySelector('.btn-next');
                if (btnPrev && btnNext) {
                    btnPrev.style.display = index === 0 ? 'none' : 'block';
                    btnNext.style.display = index === questions.length - 1 ? 'none' : 'block';
                }
            });
            submitButton.style.display = currentIndex === questions.length - 1 ? 'block' : 'none';
        }

        function navigateQuestions(index) {
            const currentIndex = getCurrentIndex(questions, 'active');
            if (index >= 0 && index < questions.length) {
                questions[currentIndex].classList.remove('active');
                questions[index].classList.add('active');
                updateButtonStates();
            } else {
                console.error('Cannot navigate to question index:', index);
            }
        }

        function getCurrentIndex(elements, className) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].classList.contains(className)) {
                    return i;
                }
            }
            return -1;
        }

    } 
});


/***/ }),

/***/ "./assets/src/js/frontend/leadsplugin.js":
/*!***********************************************!*\
  !*** ./assets/src/js/frontend/leadsplugin.js ***!
  \***********************************************/
/***/ (function() {

// Flag to track if the error has been displayed
let errorDisplayed = false;

// Function to check if a string has 5 digits at the end
function hasFiveDigits(str) {
    return /\d{5}$/.test(str);
}

// Function to update UTM parameters on form submission
function updateUTMonSubmit(enteredPostcode) {
    // Get existing UTM values
    const currentUTM = new URLSearchParams(window.location.search);

    // Add or update utm_campaign based on the current value in the postcodeInput
    let utmPostcodeParam = currentUTM.get('utm_campaign');

    //utm_campaign exists
    if (utmPostcodeParam) {
        if (hasFiveDigits(utmPostcodeParam)) {
            //& has 5 digits at the end
            utmPostcodeParam = utmPostcodeParam.slice(0, -5) + enteredPostcode.slice(-5);
        } else {
            //Doesn't have 5 digits at the end
            utmPostcodeParam += `${enteredPostcode.slice(-5)}`;
        }
    } else {
        //utm_campaign doesn't exists
        if (currentUTM.toString() !== '') {
            //There are other utms
            utmPostcodeParam = `${enteredPostcode.slice(-5)}`;
        } else {
            //There are no other utms
            utmPostcodeParam = `${enteredPostcode.slice(-5)}`;
        }
    }

    // Update or set utm_campaign parameter
    currentUTM.set('utm_campaign', utmPostcodeParam);

    // Update the URL without reloading the page
    const newURL = `${window.location.origin}${window.location.pathname}${currentUTM.toString() === '' ? '&' : '?'}${currentUTM.toString()}`;
    window.history.replaceState({}, document.title, newURL);

}

//temporary tweak for the finnish campaign 
function setupPostcodeForm() {
    const leadsForm = document.querySelector('div.leads-form.postcode-modifier');

    if (leadsForm) {
        // console.log('Leads form found:', leadsForm);

        // Find the container within the leadsForm
        const leadsFormContainer = leadsForm.querySelector('.leads-form__form__container');

        if (leadsFormContainer) {
            // console.log('Leads form container found:', leadsFormContainer);

            // Create the inner HTML code
            const innerHTMLCode = `
            <div>
                <div class="input-container postcode">
                <input type="tel" name="postcode" placeholder="Postinumero" class="input--icon"> 
                <svg width="14" height="14" viewBox="0 0 297 297" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#212121" stroke-width="10">
                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
                    c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
                    C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
                    c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"/>
                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
                    c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
                    c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
                    C179.265,127.948,165.464,141.901,148.5,141.901z"/>
                </g>
                </svg>
               </div>
            </div>`;

            // Add div in leadsFormContainer
            const divElements = leadsFormContainer.querySelectorAll('.leads-form__form__container > div');
            const thirdDiv = Array.from(divElements)[1];

            if (thirdDiv) {
                thirdDiv.insertAdjacentHTML('afterend', innerHTMLCode);
            } else {
                // console.log('3rd div not found');
            }

            // Add event listener to postcodeInput for validation
            const postcodeInput = document.querySelector('input[type="tel"][name="postcode"]');
            const postCodeContainer = document.querySelector('.input-container.postcode');
            const errorContainerHTML = '<div class="input-container__error"><ul><li>Kirjoita kelvollinen postinumero</li></ul></div>';

            if (postcodeInput) {
                postcodeInput.addEventListener('input', () => {
                    // Finnish postal code regex pattern (five digits)
                    const postcodeRegex = /^\d{5}$/;
                    const enteredPostcode = postcodeInput.value;

                    // Postcode validation 
                    if (postcodeRegex.test(enteredPostcode)) {
                        // Valid postcode
                        if (errorDisplayed) {
                            // Remove existing error message if displayed
                            const existingError = postCodeContainer.nextElementSibling;

                            if (existingError && existingError.classList.contains('input-container__error')) {
                                existingError.remove();
                                errorDisplayed = false;
                            }
                        }

                        postcodeInput.classList.remove('error');

                        updateUTMonSubmit(enteredPostcode);

                    } else {
                        // Invalid postcode
                        // console.log('Invalid postcode. Please enter a valid Finnish postcode');
                        // Display error message only once
                        if (!errorDisplayed) {
                            // Display error message as a sibling of postCodeContainer
                            postCodeContainer.insertAdjacentHTML('afterend', errorContainerHTML);
                            postcodeInput.classList.add('error');
                            errorDisplayed = true;
                        }

                    }
                });
            } else {
                // console.log('Postcode not in the added structure');
            }
        } else {
            // console.log('NO Leads form container');
        }
    } else {
        // console.log('This leads form is not found on the page');
    }
}

window.onload = function () {
    //console.log('Window onload event triggered.');
    setupPostcodeForm();
};

/***/ }),

/***/ "./assets/src/js/frontend/nosearch.js":
/*!********************************************!*\
  !*** ./assets/src/js/frontend/nosearch.js ***!
  \********************************************/
/***/ (function() {

//add a script to the page to hide the page from google search results
window.addEventListener('DOMContentLoaded', function () {
  let body = document.querySelector('body');
  let bodyClass = body.getAttribute('class');
  let robots = document.querySelector('meta[name="robots"]');
  let robotsContent = document.querySelector('meta[content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"]');
  //check if the page is using the hide-page-from-search class
  if (bodyClass.includes('page-template-page-hide-from-search')) {
    //remove the content of the current meta tag robots
    robotsContent.removeAttribute("content");
    //add a new content value for the meta tag robots
    robots.setAttribute("content", "noindex, noarchive, nositelinkssearchbox, noimageindex, nofollow, nosnippet");
    //console.log('Page is hidden from search results');
    //console.log(robots);
  } else {
    robots.setAttribute("content", "max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    //console.log('Page is not hidden from search results');
    //console.log(robots);
  }
});


/***/ }),

/***/ "./assets/src/js/frontend/templates.js":
/*!*********************************************!*\
  !*** ./assets/src/js/frontend/templates.js ***!
  \*********************************************/
/***/ (function() {

//add missing H1 title when the page header is hidden
document.addEventListener("DOMContentLoaded", function () {
    const noPageTitleContainer = document.querySelector('div.page-content.container.no-page-title');
    const isHomeNoPageTitleContainer = document.querySelector('.home > div.page-content.container.no-page-title');
    const pageHeaderContainer = document.querySelector('.page-template-default.page > div.page-header.page-header-hidden > div.container');
    const pageTitle = document.querySelector('title').textContent;
    const strippedTitle = outputStrippedTitle(); // Get the stripped title

    // Check if there is no <h1> element on the page
    const h1Elements = document.querySelectorAll('h1');
    const isNoPageTitle = noPageTitleContainer !== null;
    const noH1OnPage = h1Elements.length === 0;

    if (isNoPageTitle && noH1OnPage && pageHeaderContainer) {
        // Check if the page header container is present and empty
        if (pageHeaderContainer && pageHeaderContainer.innerHTML.trim() === '') {
            insertTitle(strippedTitle); // Insert the title
        }
    }

    if (isNoPageTitle && noH1OnPage && isHomeNoPageTitleContainer) {
        const newElement = document.createElement('h1');
        newElement.classList.add('hidden-title');
        newElement.textContent = strippedTitle;
        isHomeNoPageTitleContainer.prepend(newElement);
    }

    function outputStrippedTitle() {
        return pageTitle.split(' - ')[0].trim(); // Return the stripped title
    }

    // Function to insert the stripped title into the specified element
    function insertTitle(title) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        titleElement.classList.add('hidden-title');
        pageHeaderContainer.appendChild(titleElement);
    }

    //Function to update the hidden title
    function updateHiddenTitle() {
        const hiddenTitleElement = pageHeaderContainer.querySelector('.hidden-title');
        if (hiddenTitleElement) {
            hiddenTitleElement.textContent = strippedTitle;
        }
    }

    const titleObserver = new MutationObserver(updateHiddenTitle);
    const titleElement = document.querySelector('title');
    titleObserver.observe(titleElement, { childList: true, subtree: true });
});

/***/ }),

/***/ "./assets/src/js/frontend/tracking.js":
/*!********************************************!*\
  !*** ./assets/src/js/frontend/tracking.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");
//tracking the sub-menu block link clicks
window.addEventListener('DOMContentLoaded', (event) => {

  jQuery('.submenu-link').on('click', function (e) {
    let submenuLinkHref = jQuery(this).attr('href');
    window.dataLayer.push({
      'link': submenuLinkHref,
      'event': 'menuClick'
    });
  });

  //custom tracking for P4 new IA&NAV
  //page types
  if (document.querySelectorAll(".page-content.container .is-pattern-p4-deep-dive-topic-pattern-layout").length > 0) {
    window.dataLayer.push({
      'pageType': 'Deep-dive Topic'
    });
  } else if (document.querySelectorAll(".page-content.container .is-pattern-p4-high-level-topic-pattern-layout").length > 0) {
    window.dataLayer.push({
      'pageType': 'High-level Topic'
    });
  } else {
    //console.log("Default page");
  }

  //page header clicks
  const cta = document.querySelectorAll(".is-pattern-p4-page-header");
  for (let li = 0; li < cta.length; li++) {
    cta[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Header',
        'eventAction': 'Call to Action',
        'event': 'navClick'
      });
    }, true);
  }

  //secondary nav clicks
  const links = document.querySelectorAll(".nav-link");
  for (let li = 0; li < links.length; li++) {
    links[li].addEventListener('click', function (e) {

      let shorthdl = links[li].textContent;
      window.dataLayer.push({
        'eventCategory': 'Sub Menu',
        'eventAction': shorthdl,
        'event': 'navClick'
      });
    }, true);
  }

  //other deep-dive topics clicks
  const ddlinks = document.querySelectorAll(".is-pattern-p4-deep-dive");
  for (let li = 0; li < ddlinks.length; li++) {
    ddlinks[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'Deep-Dive Topics',
        'event': 'navClick'
      });
    }, true);
  }

  //other high-level topics clicks
  const hllinks = document.querySelectorAll(".is-pattern-p4-quick-links");
  for (let li = 0; li < hllinks.length; li++) {
    hllinks[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'High Level Topics',
        'event': 'navClick'
      });
    }, true);
  }

});

/***/ }),

/***/ "./assets/src/scss/style.scss":
/*!************************************!*\
  !*** ./assets/src/scss/style.scss ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["jQuery"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./assets/src/js/app.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./assets/src/scss/style.scss");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _frontend_blockquote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frontend/blockquote */ "./assets/src/js/frontend/blockquote.js");
/* harmony import */ var _frontend_externaltools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./frontend/externaltools */ "./assets/src/js/frontend/externaltools.js");
/* harmony import */ var _frontend_externaltools__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_frontend_externaltools__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _frontend_gfquiz_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./frontend/gfquiz.js */ "./assets/src/js/frontend/gfquiz.js");
/* harmony import */ var _frontend_gfquiz_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_frontend_gfquiz_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _frontend_leadsplugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frontend/leadsplugin */ "./assets/src/js/frontend/leadsplugin.js");
/* harmony import */ var _frontend_leadsplugin__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_frontend_leadsplugin__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _frontend_nosearch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./frontend/nosearch */ "./assets/src/js/frontend/nosearch.js");
/* harmony import */ var _frontend_nosearch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_frontend_nosearch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _frontend_templates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./frontend/templates */ "./assets/src/js/frontend/templates.js");
/* harmony import */ var _frontend_templates__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_frontend_templates__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _frontend_tracking__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./frontend/tracking */ "./assets/src/js/frontend/tracking.js");
/* harmony import */ var _frontend_tracking__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_frontend_tracking__WEBPACK_IMPORTED_MODULE_8__);
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");


//import $ from the global scope

// import 'core-js/stable'; // for polyfills

// Expose jQuery to the global object
window.$ = (jquery__WEBPACK_IMPORTED_MODULE_1___default()) || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts







}();
/******/ })()
;
//# sourceMappingURL=index.js.map