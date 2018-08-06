// @flow
import React, { Component } from 'react';
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

const Routes = Loadable({
  loader: () => import(/* webpackChunkName: "Routes" */ './Routes'),
  loading: Loading,
  modules: ['Routes'],
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
            <Routes />
            <Footer />
          </Layout>
        </ScrollToTop>
      </ThemeProvider>
    );
  }
}
