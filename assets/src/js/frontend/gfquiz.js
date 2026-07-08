document.addEventListener('DOMContentLoaded', function () {
    let gform = document.querySelector('.gform_wrapper');
    const questions = gform.querySelectorAll('.gfield--type-quiz');
    const submitButton = gform.querySelector('.gform_button[type="submit"]');

    document.querySelectorAll('.gform_wrapper').forEach(form => {
        const questions = form.querySelectorAll('.gfield--type-quiz');

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

        if (!questions.length) {
            return;
        }
        else {

            // Show only the first question
            questions[0].classList.add('active');
            //make a switch casee for label stranslations if in the url there is /denmark/ or /sweden/ or /norway/ or /finland/, translate it to the respective language, otherwise default to english
            let labelPrev = 'Previous';
            let labelNext = 'Next';
            const url = window.location.href;

            switch (true) {
                case url.includes('/denmark/'):
                    labelPrev = 'Forrige';
                    labelNext = 'Næste';
                    break;
                case url.includes('/sweden/'):
                    labelPrev = 'Föregående';
                    labelNext = 'Nästa';
                    break;
                case url.includes('/norway/'):
                    labelPrev = 'Forrige';
                    labelNext = 'Neste';
                    break;
                case url.includes('/finland/'):
                    labelPrev = 'Edellinen';
                    labelNext = 'Seuraava';
                    break;
                default:
                    // Default to English
                    break;
            }

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
