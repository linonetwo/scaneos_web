// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';
import AutoLinkText from 'react-autolink-text2';
import Loadable from 'react-loadable';

import { Title } from '../Home/styles';
import { getBreadcrumb } from '../../components/Layout';
import type { AccountData } from '../../store/account';
import getListValueRendering from '../../components/getListValueRendering';
import Loading from '../../components/Loading';
import AccountDashboard from '../Account/AccountDashboard';

const BlockProducersMap = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BlockProducersMap" */ '../../components/ChartsAndVisualization/BlockProducersMap'),
  loading: Loading,
  modules: ['BlockProducersMap'],
});

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  padding-bottom: 50px;
  margin: auto;
  width: 90vw;
  ${breakpoint('desktop')`
    width: 1200px;
  `};
  background-color: rgb(250, 250, 250);
`;
const BPInfoContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  padding: 20px;

  width: 90vw;
  margin: 15px auto 0;
  ${breakpoint('desktop')`
    width: calc((1200px - 24px) / 2);
    margin: 24px 0 0;
  `};
`;
const IntroContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eeeeee;
  color: #333;
`;
const DetailContainer = styled.div``;
const DetailFieldContainer = styled(Flex)`
  float: left;
  width: calc(90vw / 3);
  ${breakpoint('desktop')`
    width: calc((((1200px - 24px) / 2) - 20px * 2) / 3);
  `};
  padding: 20px;
  span {
    color: #333;
  }
`;

type Props = {
  t: Function,
};
type Store = {
  data: AccountData,
  producerInfo: Object | null,
  loading: boolean,
};
type Dispatch = {
  getAccountData: (accountName: string) => void,
};

class BlockProducer extends PureComponent<Props & Store, *> {
  state = {};

  render() {
    const { t, loading, producerInfo } = this.props;
    return (
      <Fragment>
        {getBreadcrumb('producer', t)}
        <Spin tip="Connecting" spinning={loading} size="large">
          <Container justifyBetween wrap="true">
            {producerInfo && (
              <BPInfoContainer>
                <Title justifyBetween alignCenter>
                  <span>
                    <Icon type="solution" /> {t('BlockProducers')}{' '}
                    <a href={producerInfo.homepage} target="_black" rel="noopener noreferrer">
                      {producerInfo.name}
                    </a>
                  </span>
                </Title>
                <IntroContainer>
                  <article>{producerInfo.introduction || ''}</article>
                </IntroContainer>
                <DetailContainer>
                  {producerInfo.contact && (
                    <DetailFieldContainer column>
                      <h3>{t('contact')}</h3>
                      {producerInfo.contact.split('\n').map(text => <AutoLinkText text={text} />)}
                    </DetailFieldContainer>
                  )}
                  {producerInfo.location && (
                    <DetailFieldContainer column>
                      <h3>{t('location')}</h3>
                      <span>{producerInfo.location}</span>
                    </DetailFieldContainer>
                  )}
                  {producerInfo.nodeLocation && (
                    <DetailFieldContainer column>
                      <h3>{t('nodeLocation')}</h3>
                      <span>{producerInfo.nodeLocation}</span>
                    </DetailFieldContainer>
                  )}
                  {producerInfo.server && (
                    <DetailFieldContainer column>
                      <h3>{t('server')}</h3>
                      <span>{producerInfo.server}</span>
                    </DetailFieldContainer>
                  )}
                </DetailContainer>
              </BPInfoContainer>
            )}
            <BPInfoContainer>
              <AccountDashboard data={this.props.data} />
            </BPInfoContainer>
            {producerInfo && (
              <BPInfoContainer>
                <BlockProducersMap points={[producerInfo]} />
              </BPInfoContainer>
            )}
          </Container>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ account: { data, producerInfo }, info: { loading } }): Store => ({ data, producerInfo, loading });
const mapDispatch = ({ account: { getAccountData } }): Dispatch => ({ getAccountData });

type LoaderProps = Dispatch & {
  match: {
    params: {
      accountId: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentAccountName = String(props.match.params.accountId);
  return props.getAccountData(currentAccountName);
};

export default withRouter(
  translate('bp')(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(BlockProducer),
    ),
  ),
);
