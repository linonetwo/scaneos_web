// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

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

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  margin-bottom: 30px;
`;

type Props = {
  match: {
    url: string,
  },
};
type Store = {};
type Dispatch = {};

export default class ChartsAndVisualizations extends PureComponent<Props & Store & Dispatch, *> {
  render() {
    const {
      match: { url },
    } = this.props;
    return (
      <Container>
        <Switch>
          <Route exact path={`${url}/`} component={ChartList} />
          <Route path={`${url}/eos`} component={EOSPriceChart} />
          <Route path={`${url}/ram`} component={RamPriceChart} />
        </Switch>
      </Container>
    );
  }
}
