//import $ from the global scope
import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './frontend/blockquote';
import './frontend/leadsplugin.js';
import './frontend/nosearch';
import './frontend/optimonk';
import './frontend/templates.js';
import './frontend/tracking';

