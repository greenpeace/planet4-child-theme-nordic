//tracking the sub-menu block link clicks
window.addEventListener('DOMContentLoaded', (event) => {

  jQuery("#nav-main .btn-donate").on('click', function () {
    e.preventDefault();

    // Check if the Convert API exec function is available
    if (typeof window._conv_exec === 'function') {

      // Use _conv_exec to run the command immediately
      window._conv_exec({
        what: "triggerLocation",
        params: {
          locationId: "1004138120"
        }
      });
      console.log("Convert trigger executed on click.");

    } else {
      // Fallback: If Convert API isn't ready, let the button perform its default action
      // or add it to the queue (though this risks the page load issue)
      console.warn("Convert API not ready, falling back to default action.");
      window.location.href = jQuery(this).attr('href');
    }
  });

  jQuery('.submenu-link').on('click', function (e) {
    let submenuLinkHref = jQuery(this).attr('href');
    window.dataLayer.push({
      'link': submenuLinkHref,
      'event': 'menuClick'
    });
  });

  //custom tracking for P4 new IA&NAV
  //page types
  if (document.querySelectorAll(".page-content.container .is-pattern-p4-deep-dive-topic-pattern-layout").length > 0) {
    window.dataLayer.push({
      'pageType': 'Deep-dive Topic'
    });
  } else if (document.querySelectorAll(".page-content.container .is-pattern-p4-high-level-topic-pattern-layout").length > 0) {
    window.dataLayer.push({
      'pageType': 'High-level Topic'
    });
  } else {
    //console.log("Default page");
  }

  //page header clicks
  const cta = document.querySelectorAll(".is-pattern-p4-page-header");
  for (let li = 0; li < cta.length; li++) {
    cta[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Header',
        'eventAction': 'Call to Action',
        'event': 'navClick'
      });
    }, true);
  }

  //other deep-dive topics clicks
  const ddlinks = document.querySelectorAll(".is-pattern-p4-deep-dive");
  for (let li = 0; li < ddlinks.length; li++) {
    ddlinks[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'Deep-Dive Topics',
        'event': 'navClick'
      });
    }, true);
  }

  //other high-level topics clicks
  const hllinks = document.querySelectorAll(".is-pattern-p4-quick-links");
  for (let li = 0; li < hllinks.length; li++) {
    hllinks[li].addEventListener('click', function (e) {
      window.dataLayer.push({
        'eventCategory': 'Read More Topics',
        'eventAction': 'High Level Topics',
        'event': 'navClick'
      });
    }, true);
  }

});