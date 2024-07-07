const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.innerText = option;
        optionElement.classList.add('list-group-item', 'list-group-item-action');
        optionElement.addEventListener('click', () => selectOption(option, question.answer));
        optionsElement.appendChild(optionElement);
    });
}

function selectOption(selectedOption, correctAnswer) {
    const optionElements = optionsElement.getElementsByClassName('list-group-item');
    Array.from(optionElements).forEach(option => {
        option.classList.remove('active');
        if (option.innerText === selectedOption) {
            option.classList.add('active');
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
});

function showResults() {
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
}

startQuiz();
