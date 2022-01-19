import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  shandleClickLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          dataTestId="btn-go-home"
          handleClick={ this.shandleClickLogin }
        >
          Volta ao login
        </Button>
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
