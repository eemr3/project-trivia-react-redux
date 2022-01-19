import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Message from '../components/Message';

class FeedBack extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Message />
        <section>
          <h3 data-testid="feedback-total-score">{score}</h3>
          <p data-testid="feedback-total-question">{assertions}</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});
export default connect(mapStateToProps)(FeedBack);
