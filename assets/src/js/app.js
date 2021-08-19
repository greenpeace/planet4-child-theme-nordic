import $ from 'jquery';
// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

import './admin/editor.js';
//adding the Optimonk scripts
import './admin/denmark';
import './admin/finland';
import './admin/norway';
import './admin/sweden';

function requireAll(r) {
  r.keys().forEach(r);
}

//Adding the Optimonk scripts
window.addEventListener('DOMContentLoaded', (event) => {
  pathnameUrl();

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark":
        let optimonkDK = document.createElement('script');
        optimonkDK.id = "optimonkDK";
        optimonkDK.type = 'text/javascript';
        optimonkDK.src = './admin/denmark.js';
        document.body.appendChild(optimonkDK);
        break;
      case "finland":
        let optimonkFI = document.createElement('script');
        optimonkFI.id = "optimonkFI";
        optimonkFI.type = 'text/javascript';
        optimonkFI.src = './admin/finland.js';
        document.body.appendChild(optimonkFI);
        break;
      case "norway":
        let optimonkNO = document.createElement('script');
        optimonkNO.id = "optimonkNO";
        optimonkNO.type = 'text/javascript';
        optimonkNO.src = './admin/norway.js';
        document.body.appendChild(optimonkNO);
        break;
      case "sweden":
        let optimonkSE = document.createElement('script');
        optimonkSE.id = "optimonkSE";
        optimonkSE.type = 'text/javascript';
        optimonkSE.src = './admin/sweden.js';
        document.body.appendChild(optimonkSE);
        break;
      default:
        let textDef = console.log("Default case");
        textDef;
    }
  }
});
