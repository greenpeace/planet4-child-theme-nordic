document.addEventListener('DOMContentLoaded', function () {
    let gform = document.querySelector('.gform_wrapper');
    const questions = gform.querySelectorAll('.gfield--type-quiz');
    const submitButton = gform.querySelector('.gform_button[type="submit"]');

    function getCountryIso() {

        const path = window.location.pathname.toLowerCase();

        switch (true) {
            case path.includes('/denmark/'):
                return 'DK';

            case path.includes('/finland/'):
                return 'FI';

            case path.includes('/norway/'):
                return 'NO';

            case path.includes('/sweden/'):
                return 'SE';

            default:
                return 'EN';
        }
    }

    const countryIso = getCountryIso();

    const countryConfig = {
        DK: {
            phone: 'Telefon',
            previous: 'Forrige',
            next: 'Næste',
            code: '45',
            min: 8,
            max: 8,
            message: 'Telefonnummeret skal være præcis 8 cifre.'
        },
        FI: {
            phone: 'Puhelinnumero',
            previous: 'Edellinen',
            next: 'Seuraava',
            code: '358',
            min: 7,
            max: 10,
            message: 'Puhelinnumeron tulee sisältää 7–10 numeroa.'
        },
        NO: {
            phone: 'Telefonnummer',
            previous: 'Forrige',
            next: 'Neste',
            code: '47',
            min: 8,
            max: 8,
            message: 'Telefonnummeret må være 8 sifre.'
        },
        SE: {
            phone: 'Telefonnummer',
            previous: 'Föregående',
            next: 'Nästa',
            code: '46',
            min: 7,
            max: 9,
            message: 'Telefonnumret måste innehålla 7–9 siffror.'
        },
        EN: {
            phone: 'Phone',
            previous: 'Previous',
            next: 'Next',
            code: '',
            min: 0,
            max: 20,
            message: 'Please enter a valid phone number.'
        }
    };

    const config = countryConfig[countryIso];
    const c = config;

    document.querySelectorAll('.gform_wrapper').forEach(form => {

        //phone validation for all forms
        const phoneField = [...form.querySelectorAll('.gfield')]
            .find(field => {
                const label = field.querySelector('.gfield_label');
                if (!label) return false;

                const text = label.textContent
                    .replace(/\(.*?\)/g, '')   // remove "(Required)"
                    .trim();

                // console.log(text);
                // console.log(c.phone.toLowerCase());

                return text.startsWith(c.phone) || text.startsWith('Phone');
            });

        if (!phoneField) {
            return;
        }

        phoneField.querySelector('.gfield_label').textContent = c.phone;

        function normalizePhone(value) {
            // Remove all non-digit characters
            value = value.trim();

            if (/[a-zA-Z]/.test(value)) {
                return {
                    valid: false,
                    value
                };
            }
            value = value.replace(/\D/g, '');

            // Remove leading zeros and country code
            if (value.startsWith('00')) {
                value = value.substring(2);
            }
            // Remove leading country code if present
            if (value.startsWith(c.code)) {
                value = value.substring(c.code.length);
            }
            // Remove leading zero if present
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            // Validate length
            const valid =
                value.length >= c.min &&
                value.length <= c.max;
            // Return normalized value with country code if valid, otherwise return original value
            return {
                valid,
                value: valid ? `+${c.code}${value}` : value
            };
        }

        // Add validation message container if it doesn't exist
        function showPhoneError(message) {

            phoneField.classList.add(
                'gfield_error',
                'gfield_contains_required'
            );

            let validation = phoneField.querySelector('.validation_message');

            if (!validation) {
                validation = document.createElement('div');
                validation.className =
                    'gfield_description validation_message gfield_validation_message field_validation_below gfield_visibility_visible';
                phoneField.appendChild(validation);
            }

            validation.innerHTML = `<span>${message}</span>`;
        }

        function clearPhoneError() {
            phoneField.classList.remove('gfield_error');

            const validation = phoneField.querySelector('.gfield_validation_message');
            if (validation) {
                validation.remove();
            }
        }

        const phoneInput = phoneField.querySelector('input');
        phoneInput.addEventListener('blur', function () {

            console.log('RAW:', phoneInput.value);

            const result = normalizePhone(phoneInput.value);

            console.log('RESULT:', result);

            if (result.valid) {
                phoneInput.value = result.value;
                clearPhoneError();
            } else {
                showPhoneError(c.message);
                phoneInput.setAttribute('aria-invalid', 'true');
            }

        });

        phoneInput.addEventListener('change', function () {

            const result = normalizePhone(phoneInput.value);

            if (result.valid) {
                phoneInput.value = result.value;
            }

        });

        phoneInput.addEventListener('input', clearPhoneError);

        jQuery(document).on('gform_post_render', function () {

            const phoneInput = phoneField.querySelector('input');

            if (!phoneInput) {
                return;
            }

            phoneInput.closest('form').addEventListener('submit', function (e) {

                const result = normalizePhone(phoneInput.value);

                console.log('GF submit validation:', result);

                if (!result.valid) {

                    e.preventDefault();

                    showPhoneError(c.message);

                    phoneInput.setAttribute('aria-invalid', 'true');

                    return false;
                }

                phoneInput.value = result.value;

            });

        });

        form.addEventListener('submit', function (e) {

            const result = normalizePhone(phoneInput.value);

            console.log('native submit:', result);

            if (!result.valid) {

                e.preventDefault();

                showPhoneError(c.message);

                phoneInput.setAttribute('aria-invalid', 'true');

                phoneField.classList.add('gfield_error');

                return false;
            }

            phoneInput.value = result.value;

        });

        //utm fetch for all forms 
        const utmField = [...form.querySelectorAll('.gfield')]
            .find(field =>
                field.querySelector('.gfield_label')?.textContent.trim().toLowerCase() === 'utm'
            );

        // console.log(utmField);

        if (utmField) {
            const input = utmField.querySelector('input');

            if (input) {
                input.value = window.location.search.substring(1);
            }
        }

        //quiz style modifcations
        jQuery(document).on('gform_post_render', function (event, formId) {

            const questions = document.querySelectorAll(
                '.gfield--type-quiz, .gfield--type-image_choice'
            );

            console.log('Questions found:', questions.length);


            if (!questions.length) {
                return;
            }

            if (questions.length > 1) {

                questions.forEach((q, i) => {
                    console.log(i, q.className, q.id);
                });

                // Show only the first question
                questions[0].classList.add('active');
                //make a switch casee for label stranslations if in the url there is /denmark/ or /sweden/ or /norway/ or /finland/, translate it to the respective language, otherwise default to english
                const labelPrev = c.previous;
                const labelNext = c.next;

                // Loop through questions to append buttons
                questions.forEach(function (question, index) {

                    const navigation = document.createElement('div');
                    navigation.classList.add(
                        'd-flex',
                        'justify-content-end',
                        'align-items-right',
                        'w-100',
                        'mt-3'
                    );

                    const btnPrev = document.createElement('a');
                    btnPrev.classList.add('btn-prev', 'pr-3', 'mr-3');
                    btnPrev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg> ${labelPrev}`;

                    btnPrev.addEventListener('click', function (event) {
                        event.preventDefault();
                        navigateQuestions(index - 1);
                    });

                    const btnNext = document.createElement('a');
                    btnNext.classList.add('btn-next', 'px-4', 'mr-3');
                    btnNext.innerHTML = `${labelNext} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>`;

                    btnNext.addEventListener('click', function (event) {
                        event.preventDefault();
                        navigateQuestions(index + 1);
                    });

                    navigation.appendChild(btnPrev);
                    navigation.appendChild(btnNext);

                    question.appendChild(navigation);
                });

                updateButtonStates();

                // Hide submit button initially
                submitButton.style.display = 'none';

                function updateButtonStates() {
                    const currentIndex = getCurrentIndex(questions, 'active');
                    questions.forEach(function (question, index) {
                        const btnPrev = question.querySelector('.btn-prev');
                        const btnNext = question.querySelector('.btn-next');
                        if (btnPrev && btnNext) {
                            btnPrev.style.display = index === 0 ? 'none' : 'block';
                            btnNext.style.display = index === questions.length - 1 ? 'none' : 'block';
                        }
                    });
                    submitButton.style.display = currentIndex === questions.length - 1 ? 'block' : 'none';
                }

                function navigateQuestions(index) {
                    const currentIndex = getCurrentIndex(questions, 'active');
                    if (index >= 0 && index < questions.length) {
                        questions[currentIndex].classList.remove('active');
                        questions[index].classList.add('active');
                        updateButtonStates();
                    } else {
                        console.error('Cannot navigate to question index:', index);
                    }
                }

                function getCurrentIndex(elements, className) {
                    for (var i = 0; i < elements.length; i++) {
                        if (elements[i].classList.contains(className)) {
                            return i;
                        }
                    }
                    return -1;
                }

            }
        });
    });
});
