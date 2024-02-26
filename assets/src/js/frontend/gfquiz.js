document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.gfield--type-quiz[data-field-class="gquiz-field"]');
    var submitButton = document.getElementById('gform_submit_button_1');

    // Show only the first question
    questions[0].classList.add('active');
    updateButtonStates();

    // Loop through questions to append buttons
    questions.forEach(function (question, index) {
        const btnPrev = document.createElement('a');
        btnPrev.classList.add('btn-prev', 'pr-3', 'mr-3');
        btnPrev.innerHTML = '<i class="fas fa-arrow-left"></i>';
        btnPrev.addEventListener('click', function () {
            console.log('Previous button clicked');
            navigateQuestions(index - 1);
        });
        question.appendChild(btnPrev);

        const btnNext = document.createElement('a');
        btnNext.classList.add('btn-next', 'px-4', 'mr-3');
        btnNext.innerHTML = '<i class="fas fa-arrow-right"></i>';
        btnNext.addEventListener('click', function () {
            console.log('Next button clicked');
            navigateQuestions(index + 1);
        });
        question.appendChild(btnNext);
    });

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
});
