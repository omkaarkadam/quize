const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; // Initial time for each question in seconds
let timer;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startButton.parentElement.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
    timeLeft = 30; // Reset time for each question
    timerElement.textContent = `Time left: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('list-group-item', 'list-group-item-action');
        optionElement.addEventListener('click', () => {
            selectOption(option, question.answer);
            clearInterval(timer); // Clear timer on option click
            setTimeout(nextQuestion, 1000); // Move to next question after 1 second
        });
        optionsElement.appendChild(optionElement);
    });

    startTimer(); // Start timer for current question
}

function selectOption(selectedOption, correctAnswer) {
    const optionElements = optionsElement.getElementsByClassName('list-group-item');
    Array.from(optionElements).forEach(option => {
        option.classList.remove('active');
        if (option.textContent === selectedOption) {
            option.classList.add('active');
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
    timerElement.style.display = 'none'; // Hide timer on results display
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = 'none';
    startButton.parentElement.style.display = 'block';
}
