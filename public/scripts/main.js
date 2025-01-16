document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const startButton = document.getElementById('start-button');
    const resultContainer = document.getElementById('result-container');

    startButton.addEventListener('click', () => {
        startQuiz();
    });

    function startQuiz() {
        // Initialize the quiz logic here
        quizContainer.innerHTML = ''; // Clear previous content
        loadQuestions();
    }

    function loadQuestions() {
        // Fetch questions from QuizService and render them
        fetch('/api/questions')
            .then(response => response.json())
            .then(questions => {
                questions.forEach(question => {
                    renderQuestion(question);
                });
            });
    }

    function renderQuestion(question) {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        questionElement.innerHTML = `
            <h2>${question.text}</h2>
            ${question.answers.map(answer => `
                <button class="answer-button">${answer}</button>
            `).join('')}
        `;

        quizContainer.appendChild(questionElement);
        questionElement.querySelectorAll('.answer-button').forEach(button => {
            button.addEventListener('click', () => handleAnswer(question.id, button.textContent));
        });
    }

    function handleAnswer(questionId, selectedAnswer) {
        // Process the selected answer
        fetch(`/api/submit-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questionId, selectedAnswer })
        })
        .then(response => response.json())
        .then(result => {
            if (result.correct) {
                // Handle correct answer
                alert('Correct!');
            } else {
                // Handle incorrect answer
                alert('Incorrect. The correct answer was: ' + result.correctAnswer);
            }
            // Load next question or show results
        });
    }
});