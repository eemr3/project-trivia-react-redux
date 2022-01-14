import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { emailValue } from '../actions/index';
import { thunkQuiz, thunkToken } from '../redux/actions';

import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisabled: true,
    };

    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { setQuiz, setToken, tokenState, history } = this.props;
    console.log(tokenState);
    setToken();
    setQuiz(tokenState);
    history.push('/game');
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
    return (
      <main className="form-signin">
        <form>
          <label htmlFor="name">
            Nome ou Nick
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
            Email Gravatar
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  tokenState: state.token,
});
const mapDispatchToProps = (dispatch) => ({
  setQuiz: (token) => dispatch(thunkQuiz(token)),
  setToken: () => dispatch(thunkToken()),
});

Login.propTypes = {
  tokenState: PropTypes.string,
  setQuiz: PropTypes.func,
  setToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Login.defaultProps = {
  tokenState: '',
  setQuiz: () => {},
  setToken: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
