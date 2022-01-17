import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// // import { emailValue } from '../actions/index';
import { thunkQuiz, thunkToken } from '../redux/actions';

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

  componentDidUpdate(prevprops) {
    const { questions } = this.props;
    const { code } = this.props;
    if (questions !== prevprops.questions) {
      this.handleAnswers();
    }
    if (code !== prevprops.code) {
      this.newToken();
    }
  }

  newToken() {
    const { code, newToken, setToken, setQuiz } = this.props;
    const number = 3;
    if (code === number) {
      setToken();
      setQuiz(newToken);
    }
  }

  handleAnswers() {
    const { questions } = this.props;
    const { responseAPI } = this.state;
    console.log(questions);
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
      // handleAnswers,
    } = this;
    const { questions } = this.props;
    return (
      <div>
        {/* <div>{handleAnswers()}</div> */}
        <section>
          <div data-testid="question-category">
            {responseAPI && `Categoria - ${questions[0].category}`}
          </div>
          <div data-testid="question-text">
            {responseAPI && questions[0].question}
          </div>
        </section>
        <section data-testid="answer-options">
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
  setQuiz: (token) => dispatch(thunkQuiz(token)),
});

Quiz.propTypes = {
  code: PropTypes.number,
  newToken: PropTypes.string,
  setQuiz: PropTypes.func,
  setToken: PropTypes.func,
  questions: PropTypes.arrayOf([]),
};

Quiz.defaultProps = {
  code: 0,
  questions: [],
  newToken: '',
  setQuiz: () => {},
  setToken: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
