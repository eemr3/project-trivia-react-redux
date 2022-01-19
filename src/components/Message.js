import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const { quantity } = this.props;
    const minimum = 3;
    return (
      <main>
        {quantity < minimum ? (
          <h2 data-testid="feedback-text">Could be better...</h2>
        ) : (
          <h2 data-testid="feedback-text">Well Done!</h2>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  quantity: state.player.assertions,
});

Message.propTypes = {
  quantity: PropTypes.number,
};

Message.defaultProps = {
  quantity: 0,
};
export default connect(mapStateToProps)(Message);
