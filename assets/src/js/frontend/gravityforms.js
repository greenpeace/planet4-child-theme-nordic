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
            message: 'Telefonnummeret må være 8 cifre, ingen mellemrum.'
        },
        FI: {
            phone: 'Puhelinnumero',
            previous: 'Edellinen',
            next: 'Seuraava',
            code: '358',
            min: 7,
            max: 10,
            message: 'Puhelinnumero sisältää 7–10 numeroa, ei välilyöntejä.'
        },
        NO: {
            phone: 'Telefonnummer',
            previous: 'Forrige',
            next: 'Neste',
            code: '47',
            min: 8,
            max: 8,
            message: 'Telefonnummeret må være 8 sifre, uten mellomrom.'
        },
        SE: {
            phone: 'Telefonnummer',
            previous: 'Föregående',
            next: 'Nästa',
            code: '46',
            min: 7,
            max: 9,
            message: 'Telefonnumret måste innehålla 7–9 siffror, inga mellanslag.'
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
        const phoneField = [...form.querySelectorAll('.gfield.gfield_visibility_visible')].find(field => {
            if (field.classList.contains('gfield--type-phone')) {
                return true;
            }

            const label = field.querySelector('.gfield_label');

            if (!label) {
                return false;
            }

            const text = label.textContent
                .replace(/\(.*?\)/g, '')
                .trim()
                .toLowerCase();

            return [
                'phone',
                'telefon',
                'telefonnummer',
                'puhelinnumero'
            ].includes(text);

        });

        if (!phoneField) {
            // console.log('GF phone field missing');
            return;
        }

        // console.log('GF phone field found:', phoneField.id);
        const isRequired =
            phoneField.classList.contains('gfield_contains_required') ||
            phoneField.querySelector('[aria-required="true"]') !== null;

        // console.log('PHONE required:', isRequired);

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

            const rawValue = phoneInput.value.trim();
            // console.log(`[${source}] raw:`, rawValue);

            // Optional + empty = OK
            if (!rawValue && !isRequired) {
                clearPhoneError();
                return true;
            }

            // Required + empty = let GF handle it
            if (!rawValue && isRequired) {
                clearPhoneError();
                return true;
            }

            const result = normalizePhone(phoneInput.value);
            if (!result.valid) {
                // console.log(`[${source}] invalid`);

                showPhoneError();
                return false;
            }

            phoneInput.value = result.value;
            // console.log(`[${source}] accepted:`, phoneInput.value);

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

        //Quiz style modifcations
        jQuery(document).on('gform_post_render', function (event, formId) {

            if (form.id !== `gform_${formId}`) {
                return;
            }

            if (form.classList.contains('quiz-initialized')) {
                return;
            }

            form.classList.add('quiz-initialized');

            const formFields = [...form.querySelectorAll('.gfield.gfield_visibility_visible')]
                .filter(field =>
                    !field.matches(
                        '.gfield--type-quiz, .gfield--type-image_choice, .gform_validation_container'
                    )
                );
            const quizFields = form.querySelectorAll(
                '.gfield.gfield_visibility_visible.gfield--type-quiz, .gfield.gfield_visibility_visible.gfield--type-image_choice'
            );

            // console.log('quizFields found:', quizFields.length);

            //hide initially all, so only the quiz is visible
            formFields.forEach(field => {
                field.style.display = 'none';
            });

            if (submitButton) {
                submitButton.style.display = 'none';
            }

            if (!quizFields.length) {
                return;
            }

            if (quizFields.length > 1) {

                // Show only the first question
                quizFields[0].classList.add('active');
                const labelPrev = c.previous;
                const labelNext = c.next;

                // Loop through quizFields to append buttons
                quizFields.forEach(function (question, index) {

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
                                navigateQuestions(index + 1);
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

                function getCurrentIndex(elements, className) {
                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].classList.contains(className)) {
                            return i;
                        }
                    }
                    return -1;
                }

                updateButtonStates();

                function updateButtonStates() {
                    const currentIndex = getCurrentIndex(quizFields, 'active');
                    quizFields.forEach(function (question, index) {
                        const btnPrev = question.querySelector('.btn-prev');
                        const btnNext = question.querySelector('.btn-next');
                        if (btnPrev && btnNext) {
                            btnPrev.style.display = index === 0 ? 'none' : 'block';
                            btnNext.style.display = index === quizFields.length - 1 ? 'none' : 'block';
                        }
                    });
                }

                function navigateQuestions(index) {
                    const currentIndex = getCurrentIndex(quizFields, 'active');

                    if (index >= 0 && index < quizFields.length) {
                        quizFields[currentIndex].classList.remove('active');
                        quizFields[index].classList.add('active');
                        updateButtonStates();
                        return;
                    }

                    if (index === quizFields.length) {
                        quizFields[currentIndex].classList.remove('active');

                        formFields.forEach(field => {
                            field.style.display = '';
                        });

                        if (submitButton) {
                            submitButton.style.display = 'block';
                        }

                        return;
                    }
                }

            }
        });
    });
});
