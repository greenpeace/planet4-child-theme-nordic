// console.log('Adding the ECI script here..');
window.addEventListener('DOMContentLoaded', (event) => {
  let formBlock = document.querySelector(".leads-form__grid");
  let eciForm = document.getElementById('proca');
  let eciText = jQuery('.eci-description p');
  let eciList = jQuery('.eci-description p ul li');

  if(eciForm){
    eciForm = true;
    window.dataLayer.push({
      'funnel': 'eci-funnel'
    });
    jQuery(formBlock).css({
      "display": "none",
      "animation": "fadeIn linear 2s",
    });
    function delayForm(){
      jQuery(formBlock).css({
        "display": "grid"
      });
    }
    setTimeout(delayForm, 600);
    // console.log('ECI LOADED..');
  }else{
    eciForm = false;
    // console.log('NO ECI..');
  }

  switch(eciForm){
    case true:
      console.log('eci');
      jQuery(function() {
        jQuery('.eci-form-wrapper').css({
          "padding": "1.5rem",
          "padding-bottom": "2rem"
        });

        jQuery(eciText).add(eciList).css({
          "font-family": "Roboto",
          "font-weight": "600",
          "font-size": "1rem"
        });

        // Hide your normal petition form (can do this using CSS instead)
        jQuery('.leads-form__form__container').hide();

        // Hide your normal petition text (can do this using CSS instead)
        jQuery('.leads-form__content h2').hide();
        jQuery('.leads-form__content .description').hide();

        // Move ECI Form to inside normal form
        jQuery('.leads-form__form').prepend(jQuery('.eci-form-wrapper'));

        // Move ECI text to inside normal tet
        jQuery('.leads-form__content').prepend(jQuery('.eci-text-wrapper'));

        // Show ECI Form and Text
        jQuery('.eci-form-wrapper, .eci-text-wrapper').show("fast");
        // jQuery(proca.set('layout', 'variant','filled'));
      });
      break;
    case false:
      console.log('no eci');
      jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').show();
      break;
    default:
    console.log('DEFAULT SWITCH CASE..');
      // Show your normal petition form & text
      jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').show();
  }
});

// Listen to the "ECI Completed Event"
window.addEventListener("eci:complete", function (e) {
  window.dataLayer.push({
    'event': 'eciSignup'
  });

  jQuery('.eci-form-wrapper, .eci-text-wrapper').hide();

  // Show your normal petition form & text
  jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').fadeIn(1400);
});

// the ECI counter widget
window.addEventListener("proca", function (e) {
	if (e.detail.message == "count") {
		var counter = document.querySelector('.eci-counter');
		counter.innerText = e.detail.value;
	}
});
