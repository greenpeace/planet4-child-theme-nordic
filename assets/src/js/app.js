import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

//tracking the sub-menu links clicks
window.addEventListener('DOMContentLoaded', (event) => {
  jQuery('.submenu-link').on('click', function(e) {
    let submenuLinkHref = jQuery(this).attr('href');
    // console.log(href);
    window.dataLayer.push({
      'link': submenuLinkHref,
      'event': 'menuClick'
    });
  });
});


//adding other scripts
import './admin/editor.js';
import './admin/optimonk.js';

