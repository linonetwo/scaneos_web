// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { I18nextProvider, translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import loadable from 'loadable-components';

import { store, history } from './store';
import i18n from './i18n';

import Header, { Footer } from './components/Layout';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

const Block = loadable(() => import('./pages/Block'), {
  LoadingComponent: Loading,
});
const Blocks = loadable(() => import('./pages/Blocks'), {
  LoadingComponent: Loading,
});
const Transaction = loadable(() => import('./pages/Transaction'), {
  LoadingComponent: Loading,
});
const Transactions = loadable(() => import('./pages/Transactions'), {
  LoadingComponent: Loading,
});
const Account = loadable(() => import('./pages/Account'), {
  LoadingComponent: Loading,
});
const Accounts = loadable(() => import('./pages/Accounts'), {
  LoadingComponent: Loading,
});
const Message = loadable(() => import('./pages/Message'), {
  LoadingComponent: Loading,
});
const Messages = loadable(() => import('./pages/Messages'), {
  LoadingComponent: Loading,
});
const Home = loadable(() => import('./pages/Home'), {
  LoadingComponent: Loading,
});
const BlockProducers = loadable(() => import('./pages/BlockProducers'), {
  LoadingComponent: Loading,
});
const UnderDevelopment = loadable(() => import('./pages/UnderDevelopment'), {
  LoadingComponent: Loading,
});
const About = loadable(() => import('./pages/About'), {
  LoadingComponent: Loading,
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
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router history={history}>
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
          </Router>
        </Provider>
      </I18nextProvider>
    );
  }
}
