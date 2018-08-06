// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';

import Loading from '../../components/Loading';
import { getBreadcrumb } from '../../components/Layout';
import DAppList from './DAppList';

const Ram = Loadable({
  loader: () => import(/* webpackChunkName: "Ram" */ './Ram'),
  loading: Loading,
  modules: ['Ram'],
});

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  margin-bottom: 30px;
`;

type Props = {
  match: {
    url: string,
  },
  t: Function,
};

class ChartsAndVisualizations extends PureComponent<Props> {
  render() {
    const {
      match: { url },
      t,
    } = this.props;
    return (
      <Container column>
        {getBreadcrumb('dapp', t, true)}
        <Helmet>
          <title>
            EOS {t('DApps')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Switch>
          <Route exact path={`${url}/`} component={DAppList} />
          <Route path={`${url}/ram`} component={Ram} />
        </Switch>
      </Container>
    );
  }
}
export default translate()(ChartsAndVisualizations);
