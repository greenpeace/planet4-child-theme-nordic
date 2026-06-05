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

// Include several scripts to the frontend if leads form is present on the page.
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.leads-form')) {
    const [
      {setupExternalLinks},
      {removeRelatedPostsSection},
      {removeNoPostText},
      {setupPDFIcon}
    ] = await Promise.all([
      import('./frontend/external_links'),
      import('./frontend/remove_related_section_no_posts'),
      import('./frontend/query-no-posts'),
      import('./frontend/pdf_icon'),
    ]);

    setupExternalLinks();
    removeRelatedPostsSection();
    removeNoPostText();
    setupPDFIcon();
  }
})

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
