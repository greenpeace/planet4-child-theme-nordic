!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){!function(){e.exports=this.jQuery}()},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);n(2);window.$=o.a||jQuery,window.dataLayer=window.dataLayer||[],window.addEventListener("DOMContentLoaded",(function(e){jQuery(".submenu-link").on("click",(function(e){var t=jQuery(this).attr("href");window.dataLayer.push({link:t,event:"menuClick"})}))})),window.addEventListener("DOMContentLoaded",(function(e){!function(){switch(window.location.pathname.split("/")[1]){case"denmark":jQuery('<script id="optimonkDK" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118834"); <\/script>').appendTo(document.body);break;case"finland":jQuery('<script id="optimonkFI" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118832"); <\/script>').appendTo(document.body);break;case"norway":jQuery('<script id="optimonkNO" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t);})(document,"118833"); <\/script>').appendTo(document.body);break;case"sweden":jQuery('<script id="optimonkSE" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"112168"); <\/script>').appendTo(document.body);break;default:jQuery('<script id="optimonkDEV" type="text/javascript"> console.log("Default case"); <\/script>').appendTo(document.body)}}()}))},function(e,t){window.addEventListener("DOMContentLoaded",(function(e){var t=document.querySelector(".leads-form__grid"),n=document.getElementById("proca"),r=jQuery(".eci-description p"),o=jQuery(".eci-description p ul li");if(n){n=!0,window.dataLayer.push({funnel:"eci-funnel"}),jQuery(t).css({display:"none",animation:"fadeIn linear 2s"}),setTimeout((function(){jQuery(t).css({display:"grid"})}),600)}else n=!1;switch(n){case!0:console.log("eci"),jQuery((function(){jQuery(".eci-form-wrapper").css({padding:"1.5rem","padding-bottom":"2rem"}),jQuery(r).add(o).css({"font-family":"Roboto","font-weight":"600","font-size":"1rem"}),jQuery(".leads-form__form__container").hide(),jQuery(".leads-form__content h2").hide(),jQuery(".leads-form__content .description").hide(),jQuery(".leads-form__form").prepend(jQuery(".eci-form-wrapper")),jQuery(".leads-form__content").prepend(jQuery(".eci-text-wrapper")),jQuery(".eci-form-wrapper, .eci-text-wrapper").show("fast")}));break;case!1:console.log("no eci"),jQuery(".leads-form__form__container, .leads-form__content h2, .leads-form__content .description").show();break;default:console.log("DEFAULT SWITCH CASE.."),jQuery(".leads-form__form__container, .leads-form__content h2, .leads-form__content .description").show()}})),window.addEventListener("eci:complete",(function(e){window.dataLayer.push({event:"eciSignup"}),jQuery(".eci-form-wrapper, .eci-text-wrapper").hide(),jQuery(".leads-form__form__container, .leads-form__content h2, .leads-form__content .description").fadeIn(1400)})),window.addEventListener("proca",(function(e){"count"==e.detail.message&&(document.querySelector(".eci-counter").innerText=e.detail.value)}))}]);