!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){!function(){e.exports=this.jQuery}()},function(e,t,r){"use strict";r.r(t);r(2);var n=r(0),o=r.n(n);window.$=o.a||jQuery,window.dataLayer=window.dataLayer||[],window.addEventListener("load",(function(e){!function(){switch(window.location.pathname.split("/")[1]){case"denmark":var e=document.createElement("script");e.id="optimonkDK",e.type="text/javascript",e.src="https://storage.googleapis.com/lib.greenpeace.se/apps/denmark.js",document.body.appendChild(e);break;case"sweden":var t=document.createElement("script");t.id="optimonkSE",t.type="text/javascript",t.src="https://storage.googleapis.com/lib.greenpeace.se/apps/sweden.js",document.body.appendChild(t);break;case"finland":var r=document.createElement("script");r.id="optimonkFI",r.type="text/javascript",r.src="https://storage.googleapis.com/lib.greenpeace.se/apps/finland.js",document.body.appendChild(r);break;case"norway":var n=document.createElement("script");n.id="optimonkNO",n.type="text/javascript",n.src="https://storage.googleapis.com/lib.greenpeace.se/apps/norway.js",document.body.appendChild(n);break;default:console.log("Default case")}}()}))},function(e,t){console.log("Adding the ECI script here.."),window.addEventListener("proca",(function(e){"count"==e.detail.message&&(document.querySelector(".eci-counter").innerText=e.detail.value)})),jQuery((function(){jQuery(".eci-form-wrapper").css({padding:"1.5rem","padding-bottom":"2rem"}),jQuery(".leads-form__form__container").hide(),jQuery(".leads-form__content h2").hide(),jQuery(".description").hide(),jQuery(".leads-form__form").prepend(jQuery(".eci-form-wrapper")),jQuery(".leads-form__content").prepend(jQuery(".eci-text-wrapper")),jQuery(".eci-form-wrapper, .eci-text-wrapper").show(),window.addEventListener("eci:complete",(function(e){jQuery(".eci-form-wrapper, .eci-text-wrapper").hide(),jQuery(".leads-form__form__container, .under-85, .description").fadeIn("slow",(function(){window.scroll({top:0,left:0,behavior:"smooth"})}))}))}))}]);