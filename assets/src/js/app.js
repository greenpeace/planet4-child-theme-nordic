//import $ from the global scope
import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './frontend/blockquote';
import './frontend/externaltools';
import './frontend/gconsent';
import './frontend/gfquiz.js';
import './frontend/leadsplugin';
import './frontend/nosearch';
import './frontend/templates';
import './frontend/tracking';