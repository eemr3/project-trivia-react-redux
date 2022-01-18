import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { finalTime, timerValue } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
      remainingTime: '',
    };

    this.handleRemainingTime = this.handleRemainingTime.bind(this);
  }

  componentDidMount() {
    const TIME_BEGINS = 1000;
    const { setFinalTime } = this.props;

    // https://medium.com/@staceyzander/setinterval-and-clearinterval-in-react-b1d0ee1e1a6a
    // commst

    this.intervalID = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((attState) => ({
          seconds: attState.seconds - 1,
        }));
      } else {
        setFinalTime();
      }
    }, TIME_BEGINS);
  }

  componentDidUpdate(prevProps) {
    const { finalTimeState, timer } = this.props;
    if (finalTimeState !== prevProps.finalTimeState || timer !== prevProps.timer) {
      clearInterval(this.intervalID);
      this.handleRemainingTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleRemainingTime() {
    this.setState((prevState) => ({
      remainingTime: prevState.seconds,
    }), () => {
      const { setTimeValue } = this.props;
      const { remainingTime } = this.state;
      setTimeValue(remainingTime);
    });
  }

  render() {
    const { seconds, finish } = this.state;

    return (
      <div>
        { seconds }
        <span>
          { finish }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  finalTimeState: state.finalTime,
});

const mapDispatchToProps = (dispatch) => ({
  setFinalTime: () => dispatch(finalTime()),
  setTimeValue: (timeValue) => dispatch(timerValue(timeValue)),
});

Timer.propTypes = {
  finalTimeState: PropTypes.bool.isRequired,
  setFinalTime: PropTypes.func.isRequired,
  setTimeValue: PropTypes.func.isRequired,
  timer: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
