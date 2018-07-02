// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { ThemeProvider } from 'styled-components';

import { store } from './store';

import Header, { Footer } from './components/Layout';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import './GlobalStyles';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './pages/Home'),
  loading: Loading,
  modules: ['Home'],
});
const BlockProducers = Loadable({
  loader: () => import(/* webpackChunkName: "BlockProducers" */ './pages/BlockProducers'),
  loading: Loading,
  modules: ['BlockProducers'],
});
const BlockProducer = Loadable({
  loader: () => import(/* webpackChunkName: "BlockProducer" */ './pages/BlockProducer'),
  loading: Loading,
  modules: ['BlockProducer'],
});
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
const Action = Loadable({
  loader: () => import(/* webpackChunkName: "Action" */ './pages/Action'),
  loading: Loading,
  modules: ['Action'],
});
const Actions = Loadable({
  loader: () => import(/* webpackChunkName: "Actions" */ './pages/Actions'),
  loading: Loading,
  modules: ['Actions'],
});
const Dictionary = Loadable({
  loader: () => import(/* webpackChunkName: "Dictionary" */ './pages/Dictionary'),
  loading: Loading,
  modules: ['Dictionary'],
});
const Tokens = Loadable({
  loader: () => import(/* webpackChunkName: "Tokens" */ './pages/Tokens'),
  loading: Loading,
  modules: ['Tokens'],
});
const NameBidings = Loadable({
  loader: () => import(/* webpackChunkName: "NameBidings" */ './pages/NameBidings'),
  loading: Loading,
  modules: ['NameBidings'],
});
const NameBiding = Loadable({
  loader: () => import(/* webpackChunkName: "NameBiding" */ './pages/NameBiding'),
  loading: Loading,
  modules: ['NameBiding'],
});
const UnderDevelopment = Loadable({
  loader: () => import(/* webpackChunkName: "UnderDevelopment" */ './pages/UnderDevelopment'),
  loading: Loading,
  modules: ['UnderDevelopment'],
});
const Charts = Loadable({
  loader: () => import(/* webpackChunkName: "Charts" */ './pages/Charts'),
  loading: Loading,
  modules: ['Charts'],
});
const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './pages/About'),
  loading: Loading,
  modules: ['About'],
});

function Title({ t }: { t: Function }) {
  return (
    <Helmet>
      <title>{t('webSiteTitle')}</title>
      <meta name="description" content={t('webSiteIntroduction')} />
    </Helmet>
  );
}
const DynamicTitle = translate()(Title);

const theme = {
  breakpoints: {
    mobile: 0,
    tablet: 737,
    desktop: 1200,
  },
};
export default class App extends Component<{}> {
  componentDidMount() {
    store.dispatch.history.updateURI();
    store.dispatch.history.updateNavTab();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ScrollToTop>
          <Layout>
            <DynamicTitle />
            <BackTop />
            <Header />
            <Switch>
              <Route exact path="/blocks" component={Blocks} />
              <Route exact path="/block/:blockNumOrID" component={Block} />
              <Route exact path="/transaction/:transactionID" component={Transaction} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/account/:accountName" component={Account} />
              <Route exact path="/accounts" component={Accounts} />
              <Route exact path="/action/:transactionID" component={Action} />
              <Route exact path="/actions" component={Actions} />
              <Route exact path="/dictionary" component={Dictionary} />
              <Route exact path="/tokens" component={Tokens} />
              <Route exact path="/bidings" component={NameBidings} />
              <Route exact path="/biding/:accountName" component={NameBiding} />
              <Route exact path="/producers" component={BlockProducers} />
              <Route exact path="/producer/:accountName" component={BlockProducer} />
              <Route exact path="/charts" component={Charts} />
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Home} />
              <Route component={UnderDevelopment} />
            </Switch>
            <Footer />
          </Layout>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}
