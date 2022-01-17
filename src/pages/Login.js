import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { emailValue } from '../actions/index';
import { thunkQuiz, thunkToken, emailUser } from '../redux/actions';
import logo from '../trivia.png';
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
    const { setQuiz, setToken, tokenState, history, setEmail } = this.props;
    const {
      state: {
        name,
        gravatarEmail,
      },
    } = this;
    setToken();
    setQuiz(tokenState);
    setEmail({ name, gravatarEmail });
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
      <>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
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
              <i className="fas fa-play" />
              {' '}
              Play
            </button>
            <Link
              className="link-config"
              to="/configuracao"
              data-testid="btn-settings"
            >
              <i className="fas fa-cogs" />
              {' '}
              Configuração

            </Link>
          </form>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenState: state.token,
});
const mapDispatchToProps = (dispatch) => ({
  setQuiz: (token) => dispatch(thunkQuiz(token)),
  setToken: () => dispatch(thunkToken()),
  setEmail: ({ name, gravatarEmail }) => dispatch(emailUser({ name, gravatarEmail })),
});

Login.propTypes = {
  tokenState: PropTypes.string,
  setQuiz: PropTypes.func,
  setToken: PropTypes.func,
  setEmail: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Login.defaultProps = {
  tokenState: '',
  setQuiz: () => {},
  setToken: () => {},
  setEmail: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
