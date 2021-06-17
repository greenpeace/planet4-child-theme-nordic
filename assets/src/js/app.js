// import './admin/editor.js';
import $ from 'jquery';

// function requireAll(r) {
//   r.keys().forEach(r);
// }

// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

window.addEventListener('load', (event) => {
// jQuery(document).ready(function() {

  /* empty fields hotfix */
  // $("#p4en_form input[type=text], #p4en_form input[type=email]").val("");

  // /* fill in UTM hotfix */
  // if (location.search) {
  //   $("input[name='supporter.NOT_TAGGED_27']").val(location.search);
  // }
  // console.log($("[name='supporter.NOT_TAGGED_27']").val());

  // let gdpr = $(" [name='supporter.questions.547127'], [name='supporter.questions.547128'], [name='supporter.questions.547129'], [name='supporter.questions.547130']");

  // gdpr.change(function() {
  //   if (this.checked) {
  //     $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("Y");
  //   } else {
  //     $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("");
  //   }
  //   // console.log($("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val());
  // });

  // $( "#p4en_form").submit(function(event) {
  //   function checkValue(){
  //     let nro_ok = document.forms["p4en_form"]["supporter.questions.212677"].value;
  //       if (nro_ok === "" ){
  //         dataLayer.push({
  //           'event': 'petitionSignupConsent', 'eventAction': 'optout'
  //           });
  //       return false;
  //       } else {
  //         dataLayer.push({
  //           'event': 'petitionSignupConsent', 'eventAction': 'optin'
  //         });
  //       return true;
  //       }
  //   }
  //   checkValue();
  // });

  pathnameUrl();


  //Tracking set up for the social share buttons
  // document.addEventListener('DOMContentLoaded', function() {
  //   jQuery('.eapps-social-share-buttons-item-facebook').on('click', function() {
  //     dataLayer.push({
  //       'event':'uaevent',
  //       'eventCategory':'Social Share',
  //       'eventAction': 'Facebook',
  //       'eventLabel': window.location.pathname
  //       });
  //   });
  // });

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark":
        let optimonkDK = document.createElement('script');
        optimonkDK.id = "optimonkDK";
        optimonkDK.type = 'text/javascript';
        optimonkDK.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/denmark.js';
        document.body.appendChild(optimonkDK);
        break;
      case "sweden":
        let optimonkSE = document.createElement('script');
        optimonkSE.id = "optimonkSE";
        optimonkSE.type = 'text/javascript';
        optimonkSE.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/sweden.js';
        document.body.appendChild(optimonkSE);
        break;
      case "finland":
        let optimonkFI = document.createElement('script');
        optimonkFI.id = "optimonkFI";
        optimonkFI.type = 'text/javascript';
        optimonkFI.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/finland.js';
        document.body.appendChild(optimonkFI);
        break;
      case "norway":
        let optimonkNO = document.createElement('script');
        optimonkNO.id = "optimonkNO";
        optimonkNO.type = 'text/javascript';
        optimonkNO.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/norway.js';
        document.body.appendChild(optimonkNO);
        break;
      default:
        let textDef = console.log("Default case");
        textDef;
    }
  }

});
