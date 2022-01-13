import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { emailValue } from '../actions/index';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisabled: true,
    };

    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => { this.enableDisableBtn(); });
  }

  enableDisableBtn() {
    const { name, gravatarEmail } = this.state;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValidate.test(gravatarEmail) && name) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const {
      state: {
        name,
        gravatarEmail,
        buttonDisabled,
      },
      onInputChange,
    } = this;
    // const { dispatchSetValue } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              id="name"
              name="name"
              type="text"
              value={ name }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="gravatarEmail">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="gravatarEmail"
              name="gravatarEmail"
              type="text"
              value={ gravatarEmail }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonDisabled }
            onClick={ () => {} }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
