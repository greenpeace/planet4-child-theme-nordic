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
import './frontend/gfquiz.js';
import './frontend/leadsplugin';
import './frontend/nosearch';
import './frontend/templates';
import './frontend/tracking';

// // Function to check if window.wp is ready
// const waitForWP = (callback) => {
//     if (window.wp) {
//         callback();
//     } else {
//         console.warn("window.wp is not defined. Retrying...");
//         setTimeout(() => waitForWP(callback), 100); // Check every 100ms
//     }
// };

// // Run when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//     waitForWP(() => {
//         console.log("✅ WordPress is loaded:", window.wp);
//         console.log("wp.blocks:", window.wp.blocks);
//         console.log("wp.data:", window.wp.data);
//     });
// });
