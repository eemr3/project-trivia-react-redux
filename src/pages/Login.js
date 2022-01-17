import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { emailValue } from '../actions/index';
import { thunkToken, emailUser } from '../redux/actions';
import logo from '../trivia.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisabled: true,
      validateToken: false,
    };

    this.enableDisableBtn = this.enableDisableBtn.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setToken } = this.props;
    setToken();
  }

  onInputChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => { this.enableDisableBtn(); });
  }

validadteTokenCode = (token, codeToken) => {
  if (token && codeToken === 0) {
    this.setState({ validateToken: true }, () => {
      const { history } = this.props;
      history.push('/game');
    });
  }
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
  const { tokenState, setEmail, validCodeToken } = this.props;
  const {
    state: {
      name,
      gravatarEmail,
      validateToken,
    },
  } = this;
  // setQuiz();
  setEmail({ name, gravatarEmail });
  this.validadteTokenCode(tokenState, validCodeToken);
  if (validateToken) {
    const { setToken } = this.props;
    setToken();
    // setQuiz();
    this.validadteTokenCode(tokenState, validCodeToken);
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
  validCodeToken: state.code,
});
const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(thunkToken()),
  // setQuiz: () => dispatch(thunkQuiz()),
  setEmail: ({ name, gravatarEmail }) => dispatch(emailUser({ name, gravatarEmail })),
});

Login.propTypes = {
  tokenState: PropTypes.string,
  // setQuiz: PropTypes.func,
  setToken: PropTypes.func,
  setEmail: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  validCodeToken: PropTypes.number,
};

Login.defaultProps = {
  tokenState: '',
  // setQuiz: () => {},
  setToken: () => {},
  setEmail: () => {},
  validCodeToken: 0,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
