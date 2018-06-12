// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';

import { store } from './store';

import Header, { Footer } from './components/Layout';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import './GlobalStyles';

const Block = Loadable({
  loader: () => import('./pages/Block'),
  loading: Loading,
});
const Blocks = Loadable({
  loader: () => import('./pages/Blocks'),
  loading: Loading,
});
const Transaction = Loadable({
  loader: () => import('./pages/Transaction'),
  loading: Loading,
});
const Transactions = Loadable({
  loader: () => import('./pages/Transactions'),
  loading: Loading,
});
const Account = Loadable({
  loader: () => import('./pages/Account'),
  loading: Loading,
});
const Accounts = Loadable({
  loader: () => import('./pages/Accounts'),
  loading: Loading,
});
const Message = Loadable({
  loader: () => import('./pages/Message'),
  loading: Loading,
});
const Messages = Loadable({
  loader: () => import('./pages/Messages'),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});
const BlockProducers = Loadable({
  loader: () => import('./pages/BlockProducers'),
  loading: Loading,
});
const UnderDevelopment = Loadable({
  loader: () => import('./pages/UnderDevelopment'),
  loading: Loading,
});
const About = Loadable({
  loader: () => import('./pages/About'),
  loading: Loading,
});

function Title(props: { t: Function }) {
  return (
    <Helmet>
      <title>{props.t('webSiteTitle')}</title>
      <meta name="description" content={props.t('webSiteIntroduction')} />
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
      <ScrollToTop>
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
      </ScrollToTop>
    );
  }
}
