import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hashEmail from '../service/hashEmail';

import './Header.css';

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
      const { score, valueDificulty, timeValue } = this.props;
      this.setState({
        totalScore: (valueDificulty * timeValue) + score,
      }, () => {
        const { totalScore } = this.state;
        localStorage.setItem('totalScore', totalScore);
      });
    }

    hashUserEmail() {
      const { email } = this.props;
      return hashEmail(email);
    }

    render() {
      const { name } = this.props;
      const { totalScore } = this.state;
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
          <p data-testid="header-score">{totalScore}</p>
        </header>
      );
    }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.valuesToScore.score,
  valueDificulty: state.valuesToScore.valueDificulty,
  timeValue: state.timeValue,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

Header.defaultProps = {
  name: '',
  email: '',
};
export default connect(mapStateToProps)(Header);
