import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from '../pages/Game';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}
