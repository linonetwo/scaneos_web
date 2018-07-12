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
const Tokens = Loadable({
  loader: () => import(/* webpackChunkName: "Tokens" */ './pages/Tokens'),
  loading: Loading,
  modules: ['Tokens'],
});
const NameAuctions = Loadable({
  loader: () => import(/* webpackChunkName: "NameAuctions" */ './pages/NameAuctions'),
  loading: Loading,
  modules: ['NameAuctions'],
});
const NameAuction = Loadable({
  loader: () => import(/* webpackChunkName: "NameAuction" */ './pages/NameAuction'),
  loading: Loading,
  modules: ['NameAuction'],
});
const UnderDevelopment = Loadable({
  loader: () => import(/* webpackChunkName: "UnderDevelopment" */ './pages/UnderDevelopment'),
  loading: Loading,
  modules: ['UnderDevelopment'],
});
const ChartsAndVisualizations = Loadable({
  loader: () => import(/* webpackChunkName: "ChartsAndVisualizations" */ './pages/ChartsAndVisualizations'),
  loading: Loading,
  modules: ['ChartsAndVisualizations'],
});
const AutoReport = Loadable({
  loader: () => import(/* webpackChunkName: "AutoReport" */ './pages/AutoReport'),
  loading: Loading,
  modules: ['AutoReport'],
});
const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './pages/About'),
  loading: Loading,
  modules: ['About'],
});
<<<<<<< HEAD
const Tools = Loadable({
  loader: () => import(/* webpackChunkName: "Tools" */ './pages/Tools'),
  loading: Loading,
  modules: ['Tools'],
=======
const Dictionary = Loadable({
  loader: () => import(/* webpackChunkName: "Dictionary" */ './pages/Dictionary'),
  loading: Loading,
  modules: ['Dictionary'],
});
const DictionaryEntry = Loadable({
  loader: () => import(/* webpackChunkName: "DictionaryEntry" */ './pages/DictionaryEntry'),
  loading: Loading,
  modules: ['DictionaryEntry'],
>>>>>>> master
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
              <Route exact path="/tools" component={Tools} />
              <Route exact path="/block/:blockNumOrID" component={Block} />
              <Route exact path="/transaction/:transactionID" component={Transaction} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/account/:accountName" component={Account} />
              <Route exact path="/accounts" component={Accounts} />
              <Route exact path="/action/:actionID" component={Action} />
              <Route exact path="/actions" component={Actions} />
              <Route exact path="/tokens" component={Tokens} />
              <Route exact path="/auctions" component={NameAuctions} />
              <Route exact path="/auction/:accountName" component={NameAuction} />
              <Route exact path="/producers" component={BlockProducers} />
              <Route exact path="/producer/:accountName" component={BlockProducer} />
              <Route path="/charts" component={ChartsAndVisualizations} />
              <Route path="/report" component={AutoReport} />
              <Route exact path="/about" component={About} />
              <Route exact path="/dictionary" component={Dictionary} />
              <Route exact path="/dictionary/:dictionaryField" component={DictionaryEntry} />
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
