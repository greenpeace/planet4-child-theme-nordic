//import $ from the global scope
import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './admin/editor.js';
import './admin/nosearch.js';
import './admin/optimonk.js';
// import './admin/templates.js';
import './admin/tracking.js';

