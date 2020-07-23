// import 'bootstrap';

jQuery(document).ready(function() {
  /* using jQuery, because $ upsets WordPress */

  // Expose jQuery to the global object
  window.jQuery = window.$ = jQuery;

  window.dataLayer = window.dataLayer || [];


  /* empty fields hotfix */
  $("#p4en_form input[type=text], #p4en_form input[type=email]").val("");

  /* fill in UTM hotfix */
  if (location.search) {
    $("input[name='supporter.NOT_TAGGED_27']").val(location.search)
  }

  /* check/uncheck hidden opt-in values along with rendered checkbox */
  var gdpr = $(" [name='supporter.questions.547127'], [name='supporter.questions.547128'], [name='supporter.questions.547129'], [name='supporter.questions.547130']");

  gdpr.change(function() {
    if (this.checked) {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("Y");
      dataLayer.push({
        'petitionOptin': 'optin'
      });
    } else {
      $("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val("");
      dataLayer.push({
        'petitionOptin': 'optout'
      });
    }
    // console.log($("[name='supporter.questions.2738'], [name='supporter.questions.212677']").val());
  });


});

document.addEventListener('DOMContentLoaded', function() {
  jQuery('.rotate-arrow').on('click', function() {
    jQuery(this)
      .find('[data-fa-i2svg]')
      .toggleClass('fa-angle-down')
      .toggleClass('fa-angle-right');
  });
});
