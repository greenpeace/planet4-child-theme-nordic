!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){!function(){e.exports=this.jQuery}()},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);r(2),r(3),r(4),r(5),r(6);window.$=o.a||jQuery,window.dataLayer=window.dataLayer||[],window.addEventListener("DOMContentLoaded",(function(e){!function(){switch(window.location.pathname.split("/")[1]){case"denmark":var e=document.createElement("script");e.id="optimonkDK",e.type="text/javascript",e.src="./admin/denmark.js",document.body.appendChild(e);break;case"finland":var t=document.createElement("script");t.id="optimonkFI",t.type="text/javascript",t.src="./admin/finland.js",document.body.appendChild(t);break;case"norway":var r=document.createElement("script");r.id="optimonkNO",r.type="text/javascript",r.src="./admin/norway.js",document.body.appendChild(r);break;case"sweden":var n=document.createElement("script");n.id="optimonkSE",n.type="text/javascript",n.src="./admin/sweden.js",document.body.appendChild(n);break;default:console.log("Default case")}}()}))},function(e,t){console.log("Adding the ECI script here.."),window.addEventListener("load",(function(e){var t=jQuery("form#proca-register main:nth-child(4)"),r=jQuery("form#proca-register div:nth-child(5)"),n=jQuery("form#proca-register div:nth-child(6)"),o=jQuery("form#proca-register div:nth-child(7)");jQuery(t).add(r).add(n).fadeOut("slow",(function(){window.scroll({behavior:"smooth"})})),jQuery(o).css({padding:"1.5rem 0"}),console.log("folded"),jQuery("#proca_firstname").on("click",(function(){jQuery(t).add(r).add(n).fadeIn("slow",(function(){window.scroll({top:0,left:0,behavior:"smooth"})})),console.log("unfolded")}))})),window.addEventListener("proca",(function(e){"count"==e.detail.message&&(document.querySelector(".eci-counter").innerText=e.detail.value)})),jQuery((function(){jQuery(".eci-form-wrapper").css({padding:"1.5rem","padding-bottom":"2rem"}),jQuery(".leads-form__form__container").hide(),jQuery(".leads-form__content h2").hide(),jQuery(".description").hide(),jQuery(".leads-form__form").prepend(jQuery(".eci-form-wrapper")),jQuery(".leads-form__content").prepend(jQuery(".eci-text-wrapper")),jQuery(".eci-form-wrapper, .eci-text-wrapper").show(),window.addEventListener("eci:complete",(function(e){jQuery(".eci-form-wrapper, .eci-text-wrapper").hide(),jQuery(".leads-form__form__container, .leads-form__content h2, .description").fadeIn("slow",(function(){window.scroll({top:0,left:0,behavior:"smooth"}),window.dataLayer.push({event:"petitionSignup ECI"})}))}))}))},function(e,t){var r,n,o,a;r=document,o=r.getElementsByTagName("head")[0],a=r.location.protocol,(n=r.createElement("script")).type="text/javascript",n.charset="utf-8",n.async=!0,n.defer=!0,n.src=a+"//front.optimonk.com/public/118834/js/preload.js",o.appendChild(n)},function(e,t){var r,n,o,a;r=document,o=r.getElementsByTagName("head")[0],a=r.location.protocol,(n=r.createElement("script")).type="text/javascript",n.charset="utf-8",n.async=!0,n.defer=!0,n.src=a+"//front.optimonk.com/public/118832/js/preload.js",o.appendChild(n)},function(e,t){var r,n,o,a;r=document,o=r.getElementsByTagName("head")[0],a=r.location.protocol,(n=r.createElement("script")).type="text/javascript",n.charset="utf-8",n.async=!0,n.defer=!0,n.src=a+"//front.optimonk.com/public/118833/js/preload.js",o.appendChild(n)},function(e,t){var r,n,o,a;r=document,o=r.getElementsByTagName("head")[0],a=r.location.protocol,(n=r.createElement("script")).type="text/javascript",n.charset="utf-8",n.async=!0,n.defer=!0,n.src=a+"//front.optimonk.com/public/112168/js/preload.js",o.appendChild(n)}]);