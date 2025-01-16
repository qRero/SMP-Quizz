import React from 'react';
import QuizComponent from './components/QuizComponent';
import QuizService from './services/QuizService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.quizService = new QuizService();
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
    };
  }

  componentDidMount() {
    this.loadQuestions();
  }

  loadQuestions = async () => {
    const questions = await this.quizService.fetchQuestions();
    this.setState({ questions });
  };

  handleAnswer = (isCorrect) => {
    this.setState((prevState) => ({
      score: isCorrect ? prevState.score + 1 : prevState.score,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  render() {
    const { questions, currentQuestionIndex, score } = this.state;

    return (
      <div className="App">
        <h1>Quiz Application</h1>
        {currentQuestionIndex < questions.length ? (
          <QuizComponent
            question={questions[currentQuestionIndex]}
            onAnswer={this.handleAnswer}
          />
        ) : (
          <div>
            <h2>Your Score: {score}/{questions.length}</h2>
          </div>
        )}
      </div>
    );
  }
}

export default App;