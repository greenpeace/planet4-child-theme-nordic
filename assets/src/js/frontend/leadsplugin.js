//temporary tweak for the finnish campaign 
document.addEventListener('DOMContentLoaded', () => {
    // Check if the specific page element exists
    const leadsForm = document.querySelector('div.leads-form.postcode-modifier');

    if (leadsForm) {
        console.log('Leads form found:', leadsForm);

        // Find the container within the leadsForm
        const leadsFormContainer = leadsForm.querySelector('.leads-form__form__container');

        if (leadsFormContainer) {
            console.log('Leads form container found:', leadsFormContainer);

            // Create the inner HTML code
            const innerHTMLCode = `
          <div>
            <div class="input-container">
              <input type="tel" name="postcode" placeholder="Postinumero*" class="input--icon"> 
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66732 1.66669H13.334C14.0673 1.66669 14.6673 2.26669 14.6673 3.00002V11C14.6673 11.7334 14.0673 12.3334 13.334 12.3334H2.66732C1.93398 12.3334 1.33398 11.7334 1.33398 11V3.00002C1.33398 2.26669 1.93398 1.66669 2.66732 1.66669Z" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M14.6673 3L8.00065 7.66667L1.33398 3" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </div>`;

            // Get existing UTM values
            const currentUTM = new URLSearchParams(window.location.search);
            console.log(currentUTM);

            // Add event listener to postcodeInput for validation
            const postcodeInput = document.querySelector('input[type="tel"][name="postcode"]');
            if (postcodeInput) {
                postcodeInput.addEventListener('input', () => {
                    // Finnish postal code regex pattern (five digits)
                    const postcodeRegex = /^\d{5}$/;

                    // Your postcode validation logic here
                    const enteredPostcode = postcodeInput.value;

                    if (postcodeRegex.test(enteredPostcode)) {
                        // Valid postcode

                        // Check if utm_postcode already exists in the URL
                        const utmPostcodeParam = currentUTM.get('utm_postcode');

                        if (utmPostcodeParam) {
                            // If utm_postcode already exists, replace its value
                            currentUTM.set('utm_postcode', enteredPostcode);
                        } else {
                            // If there are existing UTM parameters, add utm_postcode with "&" separator
                            if (currentUTM.toString() !== '') {
                                currentUTM.append('utm_postcode', enteredPostcode);
                            } else {
                                // If there are no existing UTM parameters, add utm_postcode with "?"
                                currentUTM.set('utm_postcode', enteredPostcode);
                            }
                        }

                        // Update the URL without reloading the page
                        const newURL = `${window.location.origin}${window.location.pathname}${currentUTM.toString() === '' ? '&' : '?'}${currentUTM.toString()}`;
                        window.history.replaceState({}, document.title, newURL);

                        console.log('Postcode updated:', enteredPostcode);
                    } else {
                        // Invalid postcode
                        console.log('Invalid postcode. Please enter a valid Finnish postcode.');
                    }
                });
            } else {
                console.log('Postcode input field not found in the added structure.');
            }
        } else {
            console.log('Leads form container not found on this page.');
        }
    } else {
        console.log('This leads form is not found on this page.');
    }
});

