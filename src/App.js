// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { I18nextProvider, translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import loadable, { getState } from 'loadable-components'

import { store, history } from './store';
import i18n from './i18n';

import Header, { Footer } from './components/Layout';

const Block = loadable(() => import('./pages/Block'));
const Blocks = loadable(() => import('./pages/Blocks'));
const Transaction = loadable(() => import('./pages/Transaction'));
const Transactions = loadable(() => import('./pages/Transactions'));
const Account = loadable(() => import('./pages/Account'));
const Accounts = loadable(() => import('./pages/Accounts'));
const Message = loadable(() => import('./pages/Message'));
const Messages = loadable(() => import('./pages/Messages'));
const Home = loadable(() => import('./pages/Home'));
const BlockProducers = loadable(() => import('./pages/BlockProducers'));
const UnderDevelopment = loadable(() => import('./pages/UnderDevelopment'));
const About = loadable(() => import('./pages/About'));
window.snapSaveState = () => getState();

function Title(props: { t: Function }) {
  return (
    <Helmet>
      <title>{props.t('webSiteTitle')}</title>
    </Helmet>
  );
}
const DynamicTitle = translate()(Title);

export default class App extends Component<{}> {
  componentDidMount() {
    store.dispatch.history.updateURI();
    store.dispatch.history.updateNavTab();
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router history={history}>
            <Layout>
              <DynamicTitle />
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
                <Route exact path="/about" component={About} />
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
