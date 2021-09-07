console.log('Adding the ECI script here..');
window.addEventListener('DOMContentLoaded', (event) => {
  let eciForm = document.getElementById('proca');
  let eciText = jQuery('.eci-description p');
  let eciList = jQuery('.eci-description p ul li');

  if(eciForm){
    eciForm = true;
    console.log('ECI LOADED..');
  }else{
    eciForm = false;
    console.log('NO ECI..');
  }

  switch(eciForm){
    case true:
      console.log('ECI SWITCH TRUE..');
      jQuery(function() {
        // Add petition form styling to ECI form (can do this using CSS instead)
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
        jQuery('.eci-form-wrapper, .eci-text-wrapper').show();
        jQuery(proca.set('layout', 'variant','filled'));

      });
      break;
    case false:
      console.log('ECI SWITCH FALSE..');
      jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').show();
      break;
    default:
    console.log('DEFAULT SWITCH CASE..');
      // Show your normal petition form & text
      jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').show();
  }
});

window.addEventListener('proca', (event) => {
   //fold b4 signup
  let child1 = jQuery('form#proca-register :nth-child(4)');
  let child2 = jQuery('form#proca-register :nth-child(5)');
  let child3 = jQuery('form#proca-register :nth-child(6)');
  let child4 = jQuery('form#proca-register :nth-child(7)');

  jQuery(child1).add(child2).add(child3).hide( 'slow', function() {
    window.scroll({
      behavior: 'smooth'
    });
    console.log("folded");
  });

  //Unfold the form when clicked on fname
  jQuery('#proca_firstname').on('click',  function() {
    jQuery(child1).add(child2).add(child3).fadeIn( 'slow', function() {
      window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
      console.log("unfolded");
    });
  });
  jQuery(child4).css({"padding": "1.5rem 0"});
});

// Listen to the "ECI Completed Event"
window.addEventListener("eci:complete", function (e) {
  window.dataLayer.push({
    'event': 'petitionSignup ECI'
  });

  jQuery('.eci-form-wrapper, .eci-text-wrapper').hide();

  // Show your normal petition form & text
  jQuery('.leads-form__form__container, .leads-form__content h2, .leads-form__content .description').fadeIn(1400, function() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
  });
});

// the ECI counter widget
window.addEventListener("proca", function (e) {
	if (e.detail.message == "count") {
		var counter = document.querySelector('.eci-counter');
		counter.innerText = e.detail.value;
	}
});

