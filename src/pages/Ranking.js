import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import logo from '../trivia.png';
import hashEmail from '../service/hashEmail';

import './Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankingStorage: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const getStorage = JSON.parse(localStorage.getItem('ranking')) || [];
    getStorage.sort((a, b) => b.score - a.score);
    this.setState({
      rankingStorage: getStorage,
    });
  }

  handleClickLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { rankingStorage } = this.state;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          dataTestId="btn-go-home"
          handleClick={ this.handleClickLogin }
          className="ranking-go-back"
        >
          <i className="fas fa-arrow-left" />
          {' '}
          Go Back Login
        </Button>
        <table className="ranking-table-container">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankingStorage.map((rank, index) => (
              <tr key={ rank.name + index }>
                <td>
                  <img
                    src={ `https://www.gravatar.com/avatar/${hashEmail(rank.picture)}` }
                    alt="Imagem Gravatar"
                  />
                </td>
                <td data-testid={ `player-name-${index}` }>{rank.name}</td>
                <td data-testid={ `player-score-${index}` }>{rank.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
