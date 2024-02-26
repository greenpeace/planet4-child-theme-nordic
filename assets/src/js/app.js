//import $ from the global scope
import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './frontend/blockquote';
import './frontend/externaltools.js';
import './frontend/gconsent.js';
// import './frontend/gfquiz.js';
import './frontend/leadsplugin.js';
import './frontend/nosearch';
import './frontend/templates.js';
import './frontend/tracking';

