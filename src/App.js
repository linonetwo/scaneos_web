// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { store, history } from './store';
import Block from './pages/Block';
import Transaction from './pages/Transaction';
import Account from './pages/Account';
import Message from './pages/Message';
import Home from './pages/Home';
import UnderDevelopment from './pages/UnderDevelopment';

export default class App extends Component<{}> {
  componentDidMount() {
    store.dispatch.history.updateURI();
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/block/:blockId" component={Block} />
            <Route exact path="/transaction/:transactionId" component={Transaction} />
            <Route exact path="/account/:accountId" component={Account} />
            <Route exact path="/message/:messageId" component={Message} />
            <Route exact path="/" component={Home} />
            <Route component={UnderDevelopment} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
