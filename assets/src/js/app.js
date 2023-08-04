//import $ from the global scope
import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//adding other scripts
import './admin/blockquote';
import './admin/nosearch';
import './admin/optimonk';
// import './admin/templates.js';
import './admin/tracking';

