import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Message from '../components/Message';

/* Mensão a ajuda para refazer e rafatorar o código dos requsitos 5,6,7 com a ajuda
  do meu filho e amigo Tiago da Silva Moreira da Turma-12
*/

class FeedBack extends Component {
  constructor() {
    super();

    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);
  }

  handleClickLogin() {
    console.log('oi');
    return <Redirect to="/" />;
  }

  handleClickRanking() {
    console.log('oi');
    return <Redirect to="/Ranking" />;
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Message />
        <section>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <p data-testid="feedback-total-question">{assertions}</p>
        </section>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickLogin }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  // name: state.player.name,
  // gravatarEmail: state.player.gravatarEmail,
});

FeedBack.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  // name: PropTypes.string,
  // gravatarEmail: PropTypes.string,
};

FeedBack.defaultProps = {
  score: 0,
  assertions: 0,
  // name: '',
  // gravatarEmail: '',
};

export default connect(mapStateToProps)(FeedBack);
