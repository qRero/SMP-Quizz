class QuizComponent {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <h2>${question.question}</h2>
            <ul>
                ${question.answers.map((answer, index) => `
                    <li>
                        <button onclick="quizComponent.handleAnswer(${index})">${answer}</button>
                    </li>
                `).join('')}
            </ul>
        `;
        return questionElement;
    }

    handleAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        if (selectedIndex === question.correctAnswerIndex) {
            alert('Correct!');
        } else {
            alert('Wrong answer. Try again!');
        }
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            document.body.innerHTML = '';
            document.body.appendChild(this.renderQuestion());
        } else {
            document.body.innerHTML = '<h2>Quiz Completed!</h2>';
        }
    }
}

const quizComponent = new QuizComponent([
    {
        question: 'What is the capital of France?',
        answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswerIndex: 2
    },
    {
        question: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
        correctAnswerIndex: 1
    }
]);

document.body.appendChild(quizComponent.renderQuestion());