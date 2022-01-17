import React, { Component } from 'react';
import Header from '../components/Header';
import Quiz from '../components/Quiz';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <h1>Oi</h1>
        <Quiz />
      </>
    );
  }
}

Game.propTypes = {

};

export default Game;
