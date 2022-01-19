import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Configuracao from '../pages/Configuracao';
import FeedBack from '../pages/FeedBack';
import Game from '../pages/Game';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Ranking from '../pages/Ranking';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/configuracao" component={ Configuracao } />
        <Route path="/feedback" component={ FeedBack } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}
