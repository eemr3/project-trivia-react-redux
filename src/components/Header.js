import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashEmail from '../service/hashEmail';

class Header extends Component {
  constructor() {
    super();

    this.hashUserEmail = this.hashUserEmail.bind(this);
  }

  hashUserEmail() {
    const { email } = this.props;
    console.log(hashEmail(email));
    return hashEmail(email);
  }

  render() {
    const { name } = this.props;
    const email = this.hashUserEmail();
    return (
      <header>
        <img data-testid="header-profile-picture" alt="userImagem" src={ `https://www.gravatar.com/avatar/${email}` } />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
