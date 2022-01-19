import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">FeedBack</h1>
      </div>
    );
  }
}

export default FeedBack;
