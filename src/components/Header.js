import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hashEmail from '../service/hashEmail';

import './Header.css';
import { scoreValue } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totalScore: 0,
    };
    this.hashUserEmail = this.hashUserEmail.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { timeValue } = this.props;
    if (timeValue !== prevProps.timeValue) {
      this.handleScore();
    }
  }

    handleScore = () => {
      const { timeValue, difficultyValue, setScore, correctAnswer } = this.props;
      if (correctAnswer) {
        const defaultValue = 10;
        const calcScore = defaultValue + (timeValue * difficultyValue);
        this.setState((prevState) => ({
          totalScore: prevState.totalScore + calcScore,
        }), () => {
          const { totalScore } = this.state;
          setScore(totalScore);
          localStorage.setItem('totalScore', totalScore);
        });
      }
    }

    hashUserEmail() {
      const { email } = this.props;
      return hashEmail(email);
    }

    render() {
      const { name, score } = this.props;

      const email = this.hashUserEmail();
      return (
        <header className="container">
          <div className="header-content">
            <img
              data-testid="header-profile-picture"
              alt="userImagem"
              src={ `https://www.gravatar.com/avatar/${email}` }
            />
            <p data-testid="header-player-name">{name}</p>
          </div>
          <p data-testid="header-score">{score}</p>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  timeValue: state.timeValue,
  difficultyValue: state.difficulty,
  correctAnswer: state.correctAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(scoreValue(score)),
});

Header.propTypes = {
  difficultyValue: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  setScore: PropTypes.func,
  timeValue: PropTypes.number,
  correctAnswer: PropTypes.bool,
};

Header.defaultProps = {
  timeValue: 0,
  difficultyValue: 0,
  setScore: () => {},
  name: '',
  email: '',
  score: 0,
  correctAnswer: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
