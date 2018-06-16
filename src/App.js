// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';

import { store } from './store';

import Header, { Footer } from './components/Layout';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import './GlobalStyles';
import Home from './pages/Home';
import BlockProducers from './pages/BlockProducers';

const Block = Loadable({
  loader: () => import(/* webpackChunkName: "Block" */ './pages/Block'),
  loading: Loading,
  modules: ['Block'],
});
const Blocks = Loadable({
  loader: () => import(/* webpackChunkName: "Blocks" */ './pages/Blocks'),
  loading: Loading,
  modules: ['Blocks'],
});
const Transaction = Loadable({
  loader: () => import(/* webpackChunkName: "Transaction" */ './pages/Transaction'),
  loading: Loading,
  modules: ['Transaction'],
});
const Transactions = Loadable({
  loader: () => import(/* webpackChunkName: "Transactions" */ './pages/Transactions'),
  loading: Loading,
  modules: ['Transactions'],
});
const Account = Loadable({
  loader: () => import(/* webpackChunkName: "Account" */ './pages/Account'),
  loading: Loading,
  modules: ['Account'],
});
const Accounts = Loadable({
  loader: () => import(/* webpackChunkName: "Accounts" */ './pages/Accounts'),
  loading: Loading,
  modules: ['Accounts'],
});
const Message = Loadable({
  loader: () => import(/* webpackChunkName: "Message" */ './pages/Message'),
  loading: Loading,
  modules: ['Message'],
});
const Messages = Loadable({
  loader: () => import(/* webpackChunkName: "Messages" */ './pages/Messages'),
  loading: Loading,
  modules: ['Messages'],
});
const UnderDevelopment = Loadable({
  loader: () => import(/* webpackChunkName: "UnderDevelopment" */ './pages/UnderDevelopment'),
  loading: Loading,
  modules: ['UnderDevelopment'],
});
const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './pages/About'),
  loading: Loading,
  modules: ['About'],
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
          <BackTop />
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
