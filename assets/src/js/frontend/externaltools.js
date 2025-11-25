//Adding the Optimonk scripts
//Version 1.1
window.addEventListener('DOMContentLoaded', (event) => {
  pathnameUrl();

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark": {
        jQuery('<script id="optimonkDK" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118834"); </' + 'script>').appendTo(document.body);
        jQuery('<script id="iRaiserDK" type="text/javascript" src="https://stoet.greenpeace.org/libs.iraiser.eu/libs/payment/frame/1.6/IRaiserFrame.js"> </' + 'script>').appendTo(document.head);
        break;
      }
      case "finland": {
        jQuery('<script id="optimonkFI" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"118832"); </' + 'script>').appendTo(document.body);
        jQuery('<script id="iRaiserFI" type="text/javascript" src="https://lahjoita.greenpeace.org/libs.iraiser.eu/libs/payment/frame/1.6/IRaiserFrame.js"> </' + 'script>').appendTo(document.head);
        
        break;
      }
      case "norway": {
        jQuery('<script id="optimonkNO" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t);})(document,"118833"); </' + 'script>').appendTo(document.body);
        //adding the insamlingskontrollen logo in the footer
        const lastChild = document.querySelector('.footer-menu > .list-unstyled').lastElementChild;
        lastChild.insertAdjacentHTML('afterend', '<li><a href="https://www.innsamlingskontrollen.no/organisasjoner/foreningen-greenpeace-norden/" target="_blank"><img src="https://storage.googleapis.com/lib.greenpeace.se/apps/Insamlingskontrollen.svg" alt="Innsamlingskontrollen Foreningen Greenpeace Norden" style="width: 4.5rem; position: initial;"></a></li>');
        jQuery('<script id="iRaiserNO" type="text/javascript" src="https://bidra.greenpeace.org/libs.iraiser.eu/libs/payment/frame/1.6/IRaiserFrame.js"> </' + 'script>').appendTo(document.head);
        break;
      }
      case "sweden": {
        jQuery('<script id="optimonkSE" type="text/javascript"> (function(e,a){ var t,r=e.getElementsByTagName("head")[0],c=e.location.protocol; t=e.createElement("script");t.type="text/javascript"; t.charset="utf-8";t.async=!0;t.defer=!0; t.src=c+"//front.optimonk.com/public/"+a+"/js/preload.js";r.appendChild(t); })(document,"112168"); </' + 'script>').appendTo(document.body);
        jQuery('<script id="iRaiserSE" type="text/javascript" src="https://stod.greenpeace.org/libs.iraiser.eu/libs/payment/frame/1.6/IRaiserFrame.js"> </' + 'script>').appendTo(document.head);
        break;
      }
      default: {
        jQuery('<script id="optimonkDEV" type="text/javascript"> console.log("Default case Optimonk"); </' + 'script>').appendTo(document.body);
        jQuery('<script id="iRaiserDEV" type="text/javascript" src="https://lahjoita.greenpeace.org/libs.iraiser.eu/libs/payment/frame/1.6/IRaiserFrame.js"> console.log("Default case iRaiser"); </' + 'script>').appendTo(document.head);
        break;
      }
    }
  }
});
