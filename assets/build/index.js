/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/app.js":
/*!******************************!*\
  !*** ./assets/src/js/app.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import 'bootstrap';
// import { optimonk } from './optimonk';
// import { consentGA } from './consentGA';
// function requireAll(r) {
//   r.keys().forEach(r);
// }
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];
window.addEventListener('load', function (event) {
  // jQuery(document).ready(function() {
  // jQuery(function($) {
  //   optimonk($);
  //   consentGA($);
  // });

  /* empty fields hotfix */
  $("#p4en_form input[type=text], #p4en_form input[type=email]").val("");
  /* fill in UTM hotfix */

  if (location.search) {
    $("input[name='supporter.NOT_TAGGED_27']").val(location.search);
  } // console.log($("[name='supporter.NOT_TAGGED_27']").val());


  var gdpr = $(" [name='supporter.questions.547127'], [name='supporter.questions.547128'], [name='supporter.questions.547129'], [name='supporter.questions.547130']");
  gdpr.change(function () {
    if (this.checked) {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("Y");
    } else {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("");
    } // console.log($("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val());

  });
  $("#p4en_form").submit(function (event) {
    function checkValue() {
      var nro_ok = document.forms["p4en_form"]["supporter.questions.212677"].value;

      if (nro_ok === "") {
        dataLayer.push({
          'event': 'petitionSignupConsent',
          'eventAction': 'optout'
        });
        return false;
      } else {
        dataLayer.push({
          'event': 'petitionSignupConsent',
          'eventAction': 'optin'
        });
        return true;
      }
    }

    checkValue();
  });
  pathnameUrl();
  document.addEventListener('DOMContentLoaded', function () {
    jQuery('.rotate-arrow').on('click', function () {
      jQuery(this).find('[data-fa-i2svg]').toggleClass('fa-angle-down').toggleClass('fa-angle-right');
    });
  }); // });

  function pathnameUrl() {
    var pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark":
        text = "DK OK";
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        var optimonkDK = document.createElement('script');
        optimonkDK.id = "optimonkDK";
        optimonkDK.type = 'text/javascript';
        optimonkDK.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/denmark.js';
        document.body.appendChild(optimonkDK);
        break;

      case "sweden":
        text = "SE OK";
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        var optimonkSE = document.createElement('script');
        optimonkSE.id = "optimonkSE";
        optimonkSE.type = 'text/javascript';
        optimonkSE.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/sweden.js';
        document.body.appendChild(optimonkSE);
        break;

      case "finland":
        text = "FI OK";
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        var optimonkFI = document.createElement('script');
        optimonkFI.id = "optimonkFI";
        optimonkFI.type = 'text/javascript';
        optimonkFI.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/finland.js';
        document.body.appendChild(optimonkFI);
        break;

      case "norway":
        text = "NO OK";
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        var optimonkNO = document.createElement('script');
        optimonkNO.id = "optimonkNO";
        optimonkNO.type = 'text/javascript';
        optimonkNO.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/norway.js';
        document.body.appendChild(optimonkNO);
        break;

      default:
        text = "Do nothing";
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map