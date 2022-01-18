import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
      finish: '',
    };
  }

  componentDidMount() {
    const TIME_BEGINS = 1000;
    const { finalTime } = this.props;

    // https://medium.com/@staceyzander/setinterval-and-clearinterval-in-react-b1d0ee1e1a6a
    // commst

    this.intervalID = setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((attState) => ({
          seconds: attState.seconds - 1,
        }));
      } else {
        this.setState({
          finish: finalTime,
        });
      }
    }, TIME_BEGINS);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
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

Timer.propTypes = {
  finalTime: PropTypes.func.isRequired,
};

export default Timer;
