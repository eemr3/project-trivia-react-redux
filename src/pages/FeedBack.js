import React, { Component } from 'react';
import Header from '../components/Header';
import Message from '../components/Message';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Message />
      </div>
    );
  }
}

export default FeedBack;
