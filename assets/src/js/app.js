import '../../../admin/js/editor.js';

// Expose jQuery to the global object
window.$ = $ || jQuery;
window.dataLayer = window.dataLayer || [];

window.addEventListener('load', (event) => {
// jQuery(document).ready(function() {

  /* empty fields hotfix */
  $("#p4en_form input[type=text], #p4en_form input[type=email]").val("");

  /* fill in UTM hotfix */
  if (location.search) {
    $("input[name='supporter.NOT_TAGGED_27']").val(location.search);
  }

  // console.log($("[name='supporter.NOT_TAGGED_27']").val());

  let gdpr = $(" [name='supporter.questions.547127'], [name='supporter.questions.547128'], [name='supporter.questions.547129'], [name='supporter.questions.547130']");

  gdpr.change(function() {
    if (this.checked) {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("Y");
    } else {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("");
    }

    // console.log($("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val());
  });

  $( "#p4en_form").submit(function(event) {
    function checkValue(){
      let nro_ok = document.forms["p4en_form"]["supporter.questions.212677"].value;
        if (nro_ok === "" ){
          dataLayer.push({
            'event': 'petitionSignupConsent', 'eventAction': 'optout'
            });
        return false;
        } else {
          dataLayer.push({
            'event': 'petitionSignupConsent', 'eventAction': 'optin'
          });
        return true;
        }
    }
    checkValue();
  });

  pathnameUrl();

  document.addEventListener('DOMContentLoaded', function() {
    jQuery('.rotate-arrow').on('click', function() {
      jQuery(this)
        .find('[data-fa-i2svg]')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-right');
    });
  });

  // });

  function pathnameUrl() {
    let pathnameUrl = window.location.pathname.split('/')[1];

    switch (pathnameUrl) {
      case "denmark":
        // let textDK = console.log("DK OK");
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        let optimonkDK = document.createElement('script');
        optimonkDK.id = "optimonkDK";
        optimonkDK.type = 'text/javascript';
        optimonkDK.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/denmark.js';
        document.body.appendChild(optimonkDK);
        // textDK;
        break;
      case "sweden":
        // let textSE = console.log("SE OK");
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        let optimonkSE = document.createElement('script');
        optimonkSE.id = "optimonkSE";
        optimonkSE.type = 'text/javascript';
        optimonkSE.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/sweden.js';
        document.body.appendChild(optimonkSE);
        // textSE;
        break;
      case "finland":
        // let textFI = console.log("FI OK");
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        let optimonkFI = document.createElement('script');
        optimonkFI.id = "optimonkFI";
        optimonkFI.type = 'text/javascript';
        optimonkFI.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/finland.js';
        document.body.appendChild(optimonkFI);
        // textFI;
        break;
      case "norway":
        // let textNO = console.log("NO OK");
        $('head').append('<meta name="google-site-verification" content="2Y9TaMdLjhsc8VRLdYGDE4Ii7Pqcz272u7-vQmCtaXc" /> ');
        let optimonkNO = document.createElement('script');
        optimonkNO.id = "optimonkNO";
        optimonkNO.type = 'text/javascript';
        optimonkNO.src = 'https://storage.googleapis.com/lib.greenpeace.se/apps/norway.js';
        document.body.appendChild(optimonkNO);
        // textNO;
        break;
      default:
        let textDef = console.log("Default case");
        textDef;
    }
  }

});
