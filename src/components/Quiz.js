import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkQuiz, thunkToken } from '../redux/actions';

import './Quiz.css';
import Timer from './Timer';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      responseAPI: false,
      stopTimer: false,
      difficulty: '',
      score: 0,
      remainingTimer: 0,
    };

    this.handleAnswers = this.handleAnswers.bind(this);
    this.randomAnswers = this.randomAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  componentDidMount() {
    const { setQuiz } = this.props;
    setQuiz();
  }

  componentDidUpdate(prevprops) {
    const { questions } = this.props;
    if (questions !== prevprops.questions) {
      this.handleAnswers();
    }
  }

  handleScore() {
    const { difficulty, remainingTimer } = this.state;
    const easyPoints = 1;
    const meddiumPoints = 2;
    const hardPoints = 3;
    console.log(remainingTimer);
    if (difficulty === 'easy') {
      this.setState((prevState) => ({
        score: prevState.score + (Number(remainingTimer) * easyPoints),
      }));
    }
    if (difficulty === 'meddium') {
      this.setState((prevState) => ({
        score: prevState.score + (Number(remainingTimer) * meddiumPoints),
      }));
    }
    if (difficulty === 'hard') {
      this.setState((prevState) => ({
        score: prevState.score + (Number(remainingTimer) * hardPoints),
      }));
    }
  }

  handleAnswers() {
    const { questions } = this.props;
    const { responseAPI } = this.state;
    if (questions.length > 0 && responseAPI !== true) {
      this.setState({
        responseAPI: true,
        difficulty: questions[0].difficulty,
      });
    }
  }

  randomAnswers() {
    const { questions, finalTimeState } = this.props;
    const incorrectAnswers = questions[0].incorrect_answers;
    const listAnswers = [questions[0].correct_answer,
      ...questions[0].incorrect_answers];
    const number = 0.5;
    const randomList = listAnswers.sort(() => Math.random() - number);

    return (
      randomList.map((answer, index) => {
        let testId = 'correct-answer';
        let className = 'correct';
        if (incorrectAnswers.some((options) => answer === options)) {
          testId = `wrong-answer-${index}`; className = ('incorrect');
        }
        return (
          <button
            disabled={ finalTimeState }
            type="button"
            className={ className }
            key={ index }
            data-testid={ testId }
            onClick={ this.handleClick }
            style={ {
              cursor: 'pointer',
              fontSize: '18px',
              marginBottom: '4px',
              padding: '15px',
              width: 350 } }
          >
            { answer }
          </button>
        );
      })
    );
  }

  handleClick({ target }) {
    const { timerAfterResponse } = this.props;
    const correctAnswer = document.querySelector('.correct');
    const correctColor = '3px solid rgb(6, 240, 15)';
    const incorrectAnswer = document.querySelectorAll('.incorrect');
    const incorrectColor = '3px solid rgb(255, 0, 0)';
    const correctScore = 10;
    correctAnswer.style.border = correctColor;
    incorrectAnswer.forEach((element) => {
      element.style.border = incorrectColor;
    });
    console.log(timerAfterResponse);
    this.handleScore();
    this.setState({
      stopTimer: true,
      score: target.className === 'correct' ? correctScore : 0,
      remainingTimer: timerAfterResponse,
    });
  }

  render() {
    const {
      state: {
        responseAPI,
        stopTimer,
      },
      randomAnswers,
    } = this;
    const { questions, finalTimeState } = this.props;
    return (
      <div className="quiz-container">
        <section className="quiz-content-question">
          <h2 data-testid="question-category">
            {responseAPI && `Categoria - ${questions[0].category}`}
          </h2>
          <p data-testid="question-text">
            {responseAPI && questions[0].question}
          </p>
        </section>
        <section data-testid="answer-options" className="quiz-content-answers">
          {responseAPI && randomAnswers()}
        </section>
        {finalTimeState && <p style={ { color: 'red' } }>Resposta errada!!</p>}
        <Timer timer={ stopTimer } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newToken: state.token,
  questions: state.resultsQuiz,
  finalTimeState: state.finalTime,
  timerAfterResponse: state.timeValue,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(thunkToken()),
  setQuiz: () => dispatch(thunkQuiz()),
});

Quiz.propTypes = {
  setQuiz: PropTypes.func,
  finalTimeState: PropTypes.bool,
  questions: PropTypes.arrayOf(PropTypes.shape()),
};

Quiz.defaultProps = {
  setQuiz: () => {},
  questions: {},
  finalTimeState: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
