import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkQuiz, thunkToken } from '../redux/actions';

import './Quiz.css';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      responseAPI: false,
    };

    this.handleAnswers = this.handleAnswers.bind(this);
    this.randomAnswers = this.randomAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleAnswers() {
    const { questions } = this.props;
    const { responseAPI } = this.state;
    if (questions.length > 0 && responseAPI !== true) {
      this.setState({ responseAPI: true });
    }
  }

  randomAnswers() {
    const { questions } = this.props;
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

  handleClick() {
    const correctAnswer = document.querySelector('.correct');
    const correctColor = '3px solid rgb(6, 240, 15)';
    const incorrectAnswer = document.querySelectorAll('.incorrect');
    const incorrectColor = '3px solid rgb(255, 0, 0)';
    correctAnswer.style.border = correctColor;
    incorrectAnswer.forEach((element) => {
      element.style.border = incorrectColor;
    });
  }

  render() {
    const {
      state: {
        responseAPI,
      },
      randomAnswers,
    } = this;
    const { questions } = this.props;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newToken: state.token,
  code: state.code,
  questions: state.resultsQuiz,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(thunkToken()),
  setQuiz: () => dispatch(thunkQuiz()),
});

Quiz.propTypes = {
  setQuiz: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape()),
};

Quiz.defaultProps = {
  setQuiz: () => {},
  questions: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
