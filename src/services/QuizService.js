class QuizService {
    constructor() {
        this.apiUrl = 'https://api.example.com/quiz'; // Replace with actual API endpoint
    }

    async fetchQuestions() {
        try {
            const response = await fetch(`${this.apiUrl}/questions`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const questions = await response.json();
            return questions;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    }

    async submitAnswers(answers) {
        try {
            const response = await fetch(`${this.apiUrl}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error submitting answers:', error);
            throw error;
        }
    }
}

export default QuizService;