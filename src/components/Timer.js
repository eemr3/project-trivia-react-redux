import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { finalTime } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
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
    const { finalTimeState } = this.props;
    if (finalTimeState !== prevProps.finalTimeState) {
      clearInterval(this.intervalID);
    }
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

const mapStateToProps = (state) => ({
  finalTimeState: state.finalTime,
});

const mapDispatchToProps = (dispatch) => ({
  setFinalTime: () => dispatch(finalTime()),
});

Timer.propTypes = {
  finalTimeState: PropTypes.bool.isRequired,
  setFinalTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
