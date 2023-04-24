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

/***/ "./assets/src/js/admin/nosearch.js":
/*!*****************************************!*\
  !*** ./assets/src/js/admin/nosearch.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//add a script to the page to hide the page from google search results
window.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  var bodyClass = body.getAttribute('class');
  var robots = document.querySelector('meta[name="robots"]');
  var robotsContent = document.querySelector('meta[content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"]');
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

/***/ "./assets/src/js/admin/optimonk.js":
/*!*****************************************!*\
  !*** ./assets/src/js/admin/optimonk.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Adding the Optimonk scripts
window.addEventListener('DOMContentLoaded', function (event) {
  pathnameUrl();
  function pathnameUrl() {
    var pathnameUrl = window.location.pathname.split('/')[1];
    switch (pathnameUrl) {
      case "denmark":
        jQuery('<script id="optimonkDK" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118834"); </' + 'script>').appendTo(document.body);
        break;
      case "finland":
        jQuery('<script id="optimonkFI" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118832"); </' + 'script>').appendTo(document.body);
        break;
      case "norway":
        jQuery('<script id="optimonkNO" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t);})(document,"118833"); </' + 'script>').appendTo(document.body);
        //fixing the logo in the footer
        //select the last child in the class footer-menu > list-unslyled > li:last-child > a
        var lastChild = document.querySelector('.footer-menu > .list-unstyled').lastElementChild;
        //append a new child after the last child with a link to the innsamlingskontrollen and image of the logo
        lastChild.insertAdjacentHTML('afterend', '<li><a href="https://www.innsamlingskontrollen.no/organisasjoner/foreningen-greenpeace-norden/" target="_blank"><img src="https://storage.googleapis.com/lib.greenpeace.se/apps/Insamlingskontrollen.svg" alt="Innsamlingskontrollen Foreningen Greenpeace Norden" style="width: 4.5rem; position: initial;"></a></li>');
        break;
      case "sweden":
        jQuery('<script id="optimonkSE" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"112168"); </' + 'script>').appendTo(document.body);
        break;
      default:
        jQuery('<script id="optimonkDEV" type="text/javascript"> console.log("Default case"); </' + 'script>').appendTo(document.body);
    }
  }
});

/***/ }),

/***/ "./assets/src/js/admin/tracking.js":
/*!*****************************************!*\
  !*** ./assets/src/js/admin/tracking.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//tracking the sub-menu block link clicks
window.addEventListener('DOMContentLoaded', function (event) {
  jQuery('.submenu-link').on('click', function (e) {
    var submenuLinkHref = jQuery(this).attr('href');
    // console.log(href);
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
    // console.log(dataLayer);
  } else if (document.querySelectorAll(".page-content.container .is-pattern-p4-high-level-topic-pattern-layout").length > 0) {
    window.dataLayer.push({
      'pageType': 'High-level Topic'
    });
    // console.log(dataLayer);
  } else {
    console.log("Default page");
  }

  //page header clicks
  var cta = document.querySelectorAll(".is-pattern-p4-page-header");
  for (var li = 0; li < cta.length; li++) {
    cta[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Header',
        'eventAction': 'Call to Action',
        'event': 'navClick'
      });
    }, true);
  }

  //secondary nav clicks
  var links = document.querySelectorAll(".nav-link");
  var _loop = function _loop(_li) {
    links[_li].addEventListener('click', function (e) {
      var shorthdl = links[_li].textContent;
      window.dataLayer.push({
        'eventCategory': 'Sub Menu',
        'eventAction': shorthdl,
        'event': 'navClick'
      });
    }, true);
  };
  for (var _li = 0; _li < links.length; _li++) {
    _loop(_li);
  }

  //other deep-dive topics clicks
  var ddlinks = document.querySelectorAll(".is-pattern-p4-deep-dive");
  for (var _li2 = 0; _li2 < ddlinks.length; _li2++) {
    ddlinks[_li2].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'Deep-Dive Topics',
        'event': 'navClick'
      });
    }, true);
  }

  //other high-level topics clicks
  var hllinks = document.querySelectorAll(".is-pattern-p4-quick-links");
  for (var _li3 = 0; _li3 < hllinks.length; _li3++) {
    hllinks[_li3].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'High Level Topics',
        'event': 'navClick'
      });
    }, true);
  }
});

/***/ }),

/***/ "./assets/src/js/app.js":
/*!******************************!*\
  !*** ./assets/src/js/app.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_nosearch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin/nosearch.js */ "./assets/src/js/admin/nosearch.js");
/* harmony import */ var _admin_nosearch_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_admin_nosearch_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _admin_optimonk_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin/optimonk.js */ "./assets/src/js/admin/optimonk.js");
/* harmony import */ var _admin_optimonk_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_admin_optimonk_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_tracking_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin/tracking.js */ "./assets/src/js/admin/tracking.js");
/* harmony import */ var _admin_tracking_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_admin_tracking_js__WEBPACK_IMPORTED_MODULE_3__);
//import $ from the global scope

// Expose jQuery to the global object
window.$ = jquery__WEBPACK_IMPORTED_MODULE_0___default.a || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts


// import './admin/templates.js';


/***/ }),

/***/ "jquery":
/*!**********************************!*\
  !*** external {"this":"jQuery"} ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["jQuery"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map