console.log('Adding the ECI script here..');
// Fold the form before signup
  window.addEventListener('load', (event) => {
    // let parent = document.getElementById("proca-register");
    // let children = [parent.querySelectorAll(":scope > *")];
    // child1 = children.map(child => child[3]);
    // child2 = jQuery(child1).next();
    // child3 = children.map(child => child[5]);
    // child4 = children.map(child => child[6]);
    let child1 = jQuery('form#proca-register main:nth-child(4)');
    let child2 = jQuery('form#proca-register div:nth-child(5)');
    let child3 = jQuery('form#proca-register div:nth-child(6)');
    let child4 = jQuery('form#proca-register div:nth-child(7)');

    jQuery(child1).add(child2).add(child3).fadeOut( 'slow', function() {
      window.scroll({
        behavior: 'smooth'
      });
    });
    jQuery(child4).css({"padding": "1.5rem 0"});
    console.log("folded");

    //Unfold the form when clicked on fname
    jQuery('#proca_firstname').on('click',  function() {
      jQuery(child1).add(child2).add(child3).fadeIn( 'slow', function() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
      });
      console.log("unfolded");
    });

  });

// the ECI widget
window.addEventListener("proca", function (e) {
	if (e.detail.message == "count") {
		var counter = document.querySelector('.eci-counter');
		counter.innerText = e.detail.value;
	}
});

jQuery(function() {


  // Add petition form styling to ECI form (can do this using CSS instead)
  jQuery('.eci-form-wrapper').css({
    "padding": "1.5rem",
    "padding-bottom": "2rem"
  });

  // Hide your normal petition form (can do this using CSS instead)
  jQuery('.leads-form__form__container').hide();

  // Hide your normal petition text (can do this using CSS instead)
  // jQuery('.under-85, .description').hide();
  //removed this one bc of the heading class being dynamic

  jQuery('.leads-form__content h2').hide();
  jQuery('.description').hide();

  // Move ECI Form to inside normal form
  jQuery('.leads-form__form').prepend(jQuery('.eci-form-wrapper'));

  // Move ECI text to inside normal tet
  jQuery('.leads-form__content').prepend(jQuery('.eci-text-wrapper'));

  // Show ECI Form and Text
  jQuery('.eci-form-wrapper, .eci-text-wrapper').show();



  // Listen to the "ECI Completed Event"
  window.addEventListener("eci:complete", function (e) {

    // Hide the ECI form & text
    jQuery('.eci-form-wrapper, .eci-text-wrapper').hide();

    // Show your normal petition form & text
          jQuery('.leads-form__form__container, .leads-form__content h2, .description').fadeIn( 'slow', function() {
              window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'

              });

              window.dataLayer.push({
                'event': 'petitionSignup ECI'
              });
          });
    // jQuery('.leads-form__form__container, .under-85, .description').show();
  });
});
