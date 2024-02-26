//tracking the sub-menu block link clicks
window.addEventListener('DOMContentLoaded', (event) => {

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

  //secondary nav clicks
  const links = document.querySelectorAll(".nav-link");
  for (let li = 0; li < links.length; li++) {
    links[li].addEventListener('click', function (e) {

      let shorthdl = links[li].textContent;
      window.dataLayer.push({
        'eventCategory': 'Sub Menu',
        'eventAction': shorthdl,
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


