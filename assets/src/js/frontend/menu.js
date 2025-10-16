//Replace the burger menu svg with the "Menu" text in the local language 
//Version 1.0
window.addEventListener('DOMContentLoaded', (event) => {
  pathnameUrl();

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark": {
        if ($(".nav-menu-toggle>svg").is(":visible")) { $(".nav-menu-toggle>svg").hide(); $(".nav-menu-toggle span").removeClass("visually-hidden").html("MENU"); }
        break;
      }
      case "finland": {
        if ($(".nav-menu-toggle>svg").is(":visible")) { $(".nav-menu-toggle>svg").hide(); $(".nav-menu-toggle span").removeClass("visually-hidden").html("VALIKKO"); }
        break;
      }
      case "norway": {
        if ($(".nav-menu-toggle>svg").is(":visible")) { $(".nav-menu-toggle>svg").hide(); $(".nav-menu-toggle span").removeClass("visually-hidden").html("MENY"); }
        break;
      }
      case "sweden": {
        if ($(".nav-menu-toggle>svg").is(":visible")) { $(".nav-menu-toggle>svg").hide(); $(".nav-menu-toggle span").removeClass("visually-hidden").html("MENY"); }
        break;
      }
      default: {
        if ($(".nav-menu-toggle>svg").is(":visible")) { $(".nav-menu-toggle>svg").hide(); $(".nav-menu-toggle span").removeClass("visually-hidden").html("MENU"); }
        break;
      }
    }
  }
}); 