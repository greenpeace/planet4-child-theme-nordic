document.addEventListener('DOMContentLoaded', function () {

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

    document.querySelectorAll('.gform_wrapper').forEach(wrapper => {

        const form = wrapper.querySelector('form');
        if (!form) return;

        const submitButton = form.querySelector('.gform_button[type="submit"]');
        // console.log('GF phone init:', form.id);
        const phoneField = [...form.querySelectorAll('.gfield')].find(field => {
            const label = field.querySelector('.gfield_label');
            if (!label) return false;

            const text = label.textContent.replace(/\(.*?\)/g, '').trim();
            // console.log('GF field check:', text);
            return text.startsWith(c.phone) || text.startsWith('Phone');
        });

        if (!phoneField) {
            // console.log('GF phone field missing');
            return;
        }

        // console.log('GF phone field found:', phoneField.id);
        phoneField.querySelector('.gfield_label').textContent = c.phone;

        function getPhoneInput() {
            return phoneField.querySelector('input');
        }

        function normalizePhone(value) {

            // console.log('PHONE normalize input:', value);
            value = value.trim();

            if (/[a-zA-Z]/.test(value)) {
                // console.log('PHONE failed: letters detected');
                return { valid: false, value };
            }

            value = value.replace(/\D/g, '');

            // console.log('PHONE digits only:', value);
            if (value.startsWith('00')) {
                value = value.substring(2);
                // console.log('PHONE removed 00:', value);
            }

            if (c.code && value.startsWith(c.code)) {
                value = value.substring(c.code.length);
                // console.log('PHONE removed country:', value);
            }

            if (value.startsWith('0')) {
                value = value.substring(1);
                //  console.log('PHONE removed leading zero:', value);
            }

            const valid =
                value.length >= c.min &&
                value.length <= c.max;

            const result = {
                valid,
                value: valid ? `+${c.code}${value}` : value
            };

            // console.log('PHONE result:', JSON.stringify(result));
            return result;
        }


        function showPhoneError() {

            const phoneInput = getPhoneInput();

            // console.log('PHONE error shown');
            phoneField.classList.add(
                'gfield_error',
                'gfield_contains_required'
            );

            if (phoneInput) {
                phoneInput.setAttribute('aria-invalid', 'true');
            }

            let validation = phoneField.querySelector('.gfield_validation_message');

            if (!validation) {

                validation = document.createElement('div');
                validation.className =
                    'gfield_description validation_message gfield_validation_message field_validation_below gfield_visibility_visible';

                phoneField.appendChild(validation);
            }

            validation.innerHTML = `<span>${c.message}</span>`;
        }


        function clearPhoneError() {

            // console.log('PHONE clear error');
            const phoneInput = getPhoneInput();
            phoneField.classList.remove('gfield_error');

            if (phoneInput) {
                phoneInput.removeAttribute('aria-invalid');
            }

            const validation =
                phoneField.querySelector('.gfield_validation_message');

            if (validation) {
                validation.remove();
            }
        }


        function validatePhone(source) {

            const phoneInput = getPhoneInput();
            if (!phoneInput) {
                // console.log('PHONE input missing');
                return false;
            }

            // console.log('PHONE validate from:', source, 'value:', phoneInput.value);
            const result = normalizePhone(phoneInput.value);

            if (!result.valid) {
                // console.log('PHONE blocked');
                showPhoneError();
                return false;
            }

            phoneInput.value = result.value;

            // console.log('PHONE accepted:', phoneInput.value);
            clearPhoneError();
            return true;
        }


        function attachPhoneEvents() {

            const phoneInput = getPhoneInput();
            if (!phoneInput) {
                // console.log('PHONE attach failed');
                return;
            }

            // console.log('PHONE listeners attached:', phoneInput.id);
            phoneInput.addEventListener('blur', function () {
                validatePhone('blur');
            });

            phoneInput.addEventListener('change', function () {
                validatePhone('change');
            });

            phoneInput.addEventListener('input', function () {
                clearPhoneError();
            });

            form.addEventListener('submit', function (e) {

                // console.log('PHONE native submit');
                if (!validatePhone('submit')) {

                    // console.log('PHONE native submit blocked');
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    return false;
                }

            }, true);


            if (submitButton) {

                submitButton.addEventListener('click', function (e) {

                    // console.log('PHONE submit button clicked');
                    if (!validatePhone('button click')) {

                        // console.log('PHONE button blocked');
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        return false;
                    }

                }, true);
            }
        }

        jQuery(document).on('gform_post_render', function (_, formId) {

            if (form.id !== `gform_${formId}`) {
                return;
            }

            // console.log('PHONE GF render:', formId);
            attachPhoneEvents();
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

            const questions = form.querySelectorAll(
                '.gfield--type-quiz, .gfield--type-image_choice'
            );

            // console.log('Questions found:', questions.length);


            if (!questions.length) {
                return;
            }

            if (questions.length > 1) {

                questions.forEach((q, i) => {
                    // console.log(i, q.className, q.id);
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

                    // Auto advance for radio and image choice questions
                    const autoNextInputs = question.querySelectorAll(
                        'input[type="radio"], input[type="checkbox"]'
                    );

                    autoNextInputs.forEach(input => {
                        input.addEventListener('change', function () {
                            setTimeout(() => {
                                if (index < questions.length - 1) {
                                    navigateQuestions(index + 1);
                                }
                            }, 250);
                        });
                    });

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
                    if (submitButton !== null) {
                        submitButton.style.display =
                            currentIndex === questions.length - 1 ? 'block' : 'none';
                    }
                }

                function navigateQuestions(index) {
                    const currentIndex = getCurrentIndex(questions, 'active');
                    if (index >= 0 && index < questions.length) {
                        questions[currentIndex].classList.remove('active');
                        questions[index].classList.add('active');
                        updateButtonStates();
                    } else {
                        // console.error('Cannot navigate to question index:', index);
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
