// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { translate } from 'react-i18next';
import Loading from '../../components/Loading';
import { getBreadcrumb } from '../../components/Layout';

const ReportList = Loadable({
  loader: () => import(/* webpackChunkName: "ReportList" */ './ReportList'),
  loading: Loading,
  modules: ['ReportList'],
});
const RamReport = Loadable({
  loader: () => import(/* webpackChunkName: "RamReport" */ './reports/RamReport'),
  loading: Loading,
  modules: ['RamReport'],
});
const VotingReport = Loadable({
  loader: () => import(/* webpackChunkName: "VotingReport" */ './reports/VotingReport'),
  loading: Loading,
  modules: ['VotingReport'],
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

class AutoReport extends PureComponent<Props> {
  render() {
    const {
      match: { url },
      t,
    } = this.props;
    return (
      <Container column>
        {getBreadcrumb('report', t, true)}
        <Switch>
          <Route exact path={`${url}/`} component={ReportList} />
          <Route path={`${url}/ram`} component={RamReport} />
          <Route path={`${url}/voting`} component={VotingReport} />
        </Switch>
      </Container>
    );
  }
}
export default translate()(AutoReport);
