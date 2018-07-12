// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { translate } from 'react-i18next';
import Loading from '../../components/Loading';
import { getBreadcrumb } from '../../components/Layout';

const ChartList = Loadable({
  loader: () => import(/* webpackChunkName: "ChartList" */ './ChartList'),
  loading: Loading,
  modules: ['ChartList'],
});
const EOSPriceChart = Loadable({
  loader: () => import(/* webpackChunkName: "EOSPriceChart" */ '../../components/ChartsAndVisualization/EOSPriceChart'),
  loading: Loading,
  modules: ['EOSPriceChart'],
});
const RamPriceChart = Loadable({
  loader: () => import(/* webpackChunkName: "RamPriceChart" */ '../../components/ChartsAndVisualization/RamPriceChart'),
  loading: Loading,
  modules: ['RamPriceChart'],
});
const VotingProgress = Loadable({
  loader: () =>
    import(/* webpackChunkName: "VotingProgress" */ '../../components/ChartsAndVisualization/VotingProgress'),
  loading: Loading,
  modules: ['VotingProgress'],
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
        {getBreadcrumb('chart', t, true)}
        <Switch>
          <Route exact path={`${url}/`} component={ChartList} />
          <Route path={`${url}/eos`} component={EOSPriceChart} />
          <Route path={`${url}/ram`} component={RamPriceChart} />
          <Route path={`${url}/voting`} component={VotingProgress} />
        </Switch>
      </Container>
    );
  }
}
export default translate()(ChartsAndVisualizations);
