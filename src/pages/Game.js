import React, { Component } from 'react';
import Header from '../components/Header';
import Quiz from '../components/Quiz';
import Timer from '../components/Timer';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Quiz />
        <Timer
          finalTime="TestProps"
        />
      </>
    );
  }
}

Game.propTypes = {

};

export default Game;
