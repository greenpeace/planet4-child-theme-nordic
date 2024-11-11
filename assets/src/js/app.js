import '../scss/style.scss';

//import $ from the global scope
import $ from 'jquery';
// import 'core-js/stable'; // for polyfills

// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//frontend scripts
import './frontend/blockquote';
import './frontend/charts.js';
import './frontend/externaltools';
import './frontend/gfquiz.js';
import './frontend/leadsplugin';
import './frontend/nosearch';
import './frontend/templates';
import './frontend/tracking';

//block scripts
import './blocks/Chart/ChartScript.js';
import './blocks/Chart/ChartEditor.js';
import './blocks/Chart/ChartEditorScript.js';
import './blocks/Chart/ChartFrontend.js';

