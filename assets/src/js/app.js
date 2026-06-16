//import main style
import '../scss/style.scss';

//import $ from the global scope
import $ from 'jquery';
// import 'core-js/stable'; // for polyfills

// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './frontend/blockquote';
import './frontend/externaltools';
import './frontend/gfquiz';
import './frontend/iraiser';
import './frontend/leadsplugin';
import './frontend/menu';
import './frontend/nosearch';
import './frontend/templates';
import './frontend/tracking';