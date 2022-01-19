import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerValue } from '../redux/actions';

/* Mensão a ajuda para refazer e rafatorar o código dos requsitos 5,6,7 com a ajuda
  do meu filho e amigo Tiago da Silva Moreira da Turma-12
*/
import './Timer.css';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const TIME_BEGINS = 1000;
    const { handleChangeStyle } = this.props;

    // https://medium.com/@staceyzander/setinterval-and-clearinterval-in-react-b1d0ee1e1a6a
    // commst

    this.intervalID = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((attState) => ({
          seconds: attState.seconds - 1,
        }));
      } else {
        handleChangeStyle();
      }
    }, TIME_BEGINS);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { click, setTimerValue } = this.props;
    if (click) {
      clearInterval(this.intervalID);
      setTimerValue(seconds);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { seconds } = this.state;

    return (
      <div>
        <p>
          Tempo:
          {' '}
          <span>
            { seconds }
            s
          </span>
        </p>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  finalTimeState: state.finalTime,
  score: state.totalValue,
});

const mapDispatchToProps = (dispatch) => ({
  setTimerValue: (timer) => dispatch(timerValue(timer)),
});

Timer.propTypes = {
  handleChangeStyle: PropTypes.func,
  click: PropTypes.bool,
  setTimerValue: PropTypes.func,
};

Timer.defaultProps = {
  handleChangeStyle: () => {},
  setTimerValue: () => {},
  click: false,
};
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
