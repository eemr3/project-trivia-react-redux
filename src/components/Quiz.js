import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { correctAnswer, difficultyQuestion } from '../redux/actions';

import './Quiz.css';

/* Mensão a ajuda para refazer e rafatorar o código dos requsitos 5,6,7 com a ajuda
  do meu filho e amigo Tiago da Silva Moreira da Turma-12
*/

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      listButton: [],
      click: false,
      answerCorrect: false,
      enabledButtonNext: true,
      quantityCorrectAnswer: 0,
    };
  }

  componentDidMount() {
    this.setButtonState();
  }

  setButtonState = () => {
    const arrayBtnAnswer = this.handleMountButtons();
    this.setState({ listButton: arrayBtnAnswer });

    const { questions: { difficulty }, setDifficulty } = this.props;
    const scoreHard = 3;
    switch (difficulty) {
    case 'easy':
      break;
    case 'medium':
      setDifficulty(2);
      break;
    case 'hard':
      setDifficulty(scoreHard);
      break;
    default:
      return 0;
    }
  }

  handleChangeStyle = () => {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.value === 'wrong') {
        btn.style.border = '3px solid rgb(255, 0, 0)';
        btn.disabled = true;
      }
      if (btn.value === 'correct') {
        btn.style.border = '3px solid rgb(6, 240, 15)';
        btn.disabled = true;
      }
    });
    this.setState({
      click: true,
      enabledButtonNext: false,
    });
  }

  shuffleArrayButtonAnswers = (arryBtn) => {
    /*
      Algoritmo de embaralhamento de Fisher–Yates retirado do Stackoverflow link:
      https://pt.stackoverflow.com/questions/406037/mostrar-elementos-de-um-array-em-ordem-aleat%C3%B3ria
      Autor da resposta no Stackoverflow: Augusto Vasques
     */
    for (let i = arryBtn.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arryBtn[i], arryBtn[j]] = [arryBtn[j], arryBtn[i]];
    }
    return arryBtn;
  }

  handleMountButtons = () => {
    const creanteBtn = this.creatArrayButtonAnswers();
    const btnShuffle = this.shuffleArrayButtonAnswers(creanteBtn);
    return btnShuffle;
  }

  handleCorrectClick = () => {
    this.handleChangeStyle();
    const { setCorrectAnswer } = this.props;
    this.setState((prevState) => ({
      quantityCorrectAnswer: prevState.quantityCorrectAnswer + 1,
    }));
    this.setState({
      answerCorrect: true,
    }, () => {
      const { answerCorrect } = this.state;
      const defaultValue = 1;
      setCorrectAnswer({ answerCorrect, defaultValue });
    });
  }

  creatArrayButtonAnswers = () => {
    const { questions } = this.props;

    const btnList = questions.incorrect_answers.map((incorrect, index) => (
      <button
        key={ index + 1 }
        data-testid={ `wrong-answer-${index}` }
        value="wrong"
        onClick={ this.handleChangeStyle }
        type="button"
        className="btn-answer"
      >
        {incorrect}
      </button>
    ));
    const btnCorrect = (
      <button
        data-testid="correct-answer"
        onClick={ this.handleCorrectClick }
        type="button"
        value="correct"
        className="btn-answer"
      >
        {questions.correct_answer}
      </button>
    );
    btnList.push(btnCorrect);
    return btnList;
  }

  render() {
    const { questions, handleClick } = this.props;

    const { listButton, click, enabledButtonNext } = this.state;
    return (
      <section className="quiz-container">
        <h2 data-testid="question-category">{questions.category}</h2>
        <p data-testid="question-text">{questions.question}</p>
        <section data-testid="answer-options" className="quiz-content-answers">
          {listButton}
        </section>
        <Timer
          handleChangeStyle={ this.handleChangeStyle }
          click={ click }
        />
        <button
          data-testid="btn-next"
          type="button"
          hidden={ enabledButtonNext }
          className="btn-next"
          onClick={ handleClick }
        >
          Next
          {' '}
          <i className="fas fa-arrow-circle-right" />

        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  finalTime: state.finalTime,
  seconds: state.timeValue,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  setCorrectAnswer: (object) => dispatch(correctAnswer(object)),
  setDifficulty: (difficulty) => dispatch(difficultyQuestion(difficulty)),
});

Quiz.propTypes = {
  handleClick: PropTypes.func,
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
  }),
  setCorrectAnswer: PropTypes.func,
  setDifficulty: PropTypes.func,
};

Quiz.defaultProps = {
  handleClick: () => {},
  questions: {},
  setCorrectAnswer: () => {},
  setDifficulty: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
