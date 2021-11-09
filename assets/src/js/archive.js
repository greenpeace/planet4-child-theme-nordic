
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

  // Tracking set up for the social share buttons
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

//select the last child in the class footer-menu > list-unslyled > li:last-child > a
// const lastChild = document.querySelector('.footer-menu > .list-unstyled').lastElementChild;
//append a ne new child after the last child with a class inkg that contains a link to the innsamlingskontrollen and image of the logo
// lastChild.insertAdjacentHTML('afterend',  '<li class="inkg"><a href="https://www.innsamlingskontrollen.no/organisasjoner/foreningen-greenpeace-norden/" target="_blank"><img src="https://storage.googleapis.com/lib.greenpeace.se/apps/Insamlingskontrollen.svg" alt="Innsamlingskontrollen Foreningen Greenpeace Norden"></a></li>');

