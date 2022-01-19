import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Quiz from '../components/Quiz';
import { thunkQuiz } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextQuestion: 0,
    };
  }

  componentDidMount() {
    const { setQuiz } = this.props;
    setQuiz();
  }

  handleNextClick = () => {
    this.setState((prevState) => ({
      nextQuestion: prevState.nextQuestion + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { nextQuestion } = this.state;
    return (
      <>
        <Header />
        {questions.length === 0 ? (<p>Loading...</p>) : (
          <Quiz
            questions={ questions[nextQuestion] }
            handleClick={ this.handleNextClick }
          />

        )}
      </>
    );
  }
}

Game.propTypes = {

};

const mapStateToProps = (state) => ({
  questions: state.resultsQuiz,
  finalTime: state.finalTime,
});

const mapDispatchToProps = (dispatch) => ({
  setQuiz: () => dispatch(thunkQuiz()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  setQuiz: PropTypes.func,
};

Game.defaultProps = {
  questions: [],
  setQuiz: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
