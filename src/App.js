// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { I18nextProvider } from 'react-i18next';

import { store, history } from './store';
import i18n from './i18n';
import Block from './pages/Block';
import Blocks from './pages/Blocks';
import Transaction from './pages/Transaction';
import Transactions from './pages/Transactions';
import Account from './pages/Account';
import Accounts from './pages/Accounts';
import Message from './pages/Message';
import Messages from './pages/Messages';
import Home from './pages/Home';
import BlockProducers from './pages/BlockProducers';
import UnderDevelopment from './pages/UnderDevelopment';
import Header, { Footer } from './components/Layout';

export default class App extends Component<{}> {
  componentDidMount() {
    store.dispatch.history.updateURI();
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router history={history}>
            <Layout>
              <Header />
              <Switch>
                <Route exact path="/blocks" component={Blocks} />
                <Route exact path="/block/:blockNum" component={Block} />
                <Route exact path="/transaction/:transactionId" component={Transaction} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/account/:accountId" component={Account} />
                <Route exact path="/accounts" component={Accounts} />
                <Route exact path="/message/:transactionId" component={Message} />
                <Route exact path="/messages" component={Messages} />
                <Route exact path="/producers" component={BlockProducers} />
                <Route exact path="/" component={Home} />
                <Route component={UnderDevelopment} />
              </Switch>
              <Footer />
            </Layout>
          </Router>
        </Provider>
      </I18nextProvider>
    );
  }
}
