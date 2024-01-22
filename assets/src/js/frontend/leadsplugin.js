// Flag to track if the error has been displayed
let errorDisplayed = false;

//temporary tweak for the finnish campaign 
function setupPostcodeForm() {
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
                <div class="input-container postcode">
                <input type="tel" name="postcode" placeholder="Postinumero" class="input--icon"> 
                <svg width="14" height="14" viewBox="0 0 297 297" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#212121" stroke-width="10">
                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
                    c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
                    C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
                    c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"/>
                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
                    c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
                    c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
                    C179.265,127.948,165.464,141.901,148.5,141.901z"/>
                </g>
                </svg>
               </div>
            </div>`;

            // Add div in leadsFormContainer
            const divElements = leadsFormContainer.querySelectorAll('.leads-form__form__container > div');
            const thirdDiv = Array.from(divElements)[1];

            if (thirdDiv) {
                thirdDiv.insertAdjacentHTML('afterend', innerHTMLCode);
            } else {
                console.log('3rd div not found');
            }

            // Get existing UTM values
            const currentUTM = new URLSearchParams(window.location.search);
            console.log(currentUTM);

            // Add event listener to postcodeInput for validation
            const postcodeInput = document.querySelector('input[type="tel"][name="postcode"]');
            const postCodeContainer = document.querySelector('.input-container.postcode');
            const errorContainerHTML = '<div class="input-container__error"><ul><li>Kirjoita kelvollinen postinumero</li></ul></div>';

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
                        // Remove existing error message if displayed
                        if (errorDisplayed) {
                            const existingError = postCodeContainer.nextElementSibling;
                            
                            if (existingError && existingError.classList.contains('input-container__error')) {
                                existingError.remove();
                                errorDisplayed = false;
                                
                            }
                        }
                        
                        // Update the URL without reloading the page
                        const newURL = `${window.location.origin}${window.location.pathname}${currentUTM.toString() === '' ? '&' : '?'}${currentUTM.toString()}`;
                        window.history.replaceState({}, document.title, newURL);
                        console.log('Postcode updated:', enteredPostcode);
                        postcodeInput.classList.remove('error');

                    } else {
                        // Invalid postcode
                        console.log('Invalid postcode. Please enter a valid Finnish postcode');
                        // Display error message only once
                        if (!errorDisplayed) {
                            // Display error message as a sibling of postCodeContainer
                            postCodeContainer.insertAdjacentHTML('afterend', errorContainerHTML);
                            postcodeInput.classList.add('error');
                            errorDisplayed = true;
                        }

                    }
                });
            } else {
                console.log('Postcode not in the added structure');
            }
        } else {
            console.log('NO Leads form container');
        }
    } else {
        console.log('This leads form is not found on the page');
    }
}

window.onload = function () {
    //console.log('Window onload event triggered.');
    setupPostcodeForm();
};