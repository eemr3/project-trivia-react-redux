import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Message from '../components/Message';
import Button from '../components/Button';

/* Mensão a ajuda para refazer e rafatorar o código dos requsitos 5,6,7 com a ajuda
  do meu filho e amigo Tiago da Silva Moreira da Turma-12
*/

class FeedBack extends Component {
  constructor() {
    super();

    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);
  }

  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage = () => {
    const { score, name, gravatarEmail } = this.props;
    const getStorage = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking',
      JSON.stringify([...getStorage, { name, score, picture: gravatarEmail }]));
  }

  handleClickRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  handleClickLogin() {
    const { history } = this.props;
    history.push('/');
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
        <Button
          dataTestId="btn-play-again"
          handleClick={ this.handleClickLogin }
        >
          Play Again
        </Button>

        <Button
          dataTestId="btn-ranking"
          type="button"
          handleClick={ this.handleClickRanking }
        >
          Ranking
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,

});

FeedBack.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

FeedBack.defaultProps = {
  score: 0,
  assertions: 0,
  name: '',
  gravatarEmail: '',

};

export default connect(mapStateToProps)(FeedBack);
