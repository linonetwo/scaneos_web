// @flow
import { size } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is, { isNot } from 'styled-is';
import breakpoint from 'styled-components-breakpoint';
import { Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';
import AutoLinkText from 'react-autolink-text2';
import Loadable from 'react-loadable';

import { Title } from '../Home/styles';
import type { AccountData } from '../../store/account';
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
`;
const MainImage = styled.img`
  width: 100%;
  height: 500px;

  object-fit: contain;
  object-position: center;
  font-family: 'object-fit: contain; object-position: center;';
`;
const BPInfoContainer = styled.div`
  height: min-content;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  ${isNot('image')`
    padding: 20px;
  `};
  width: 90vw;
  margin: 15px auto 0;
  ${breakpoint('desktop')`
    width: 1200px;
    margin: 24px 0 0;
  `};
`;
const IntroContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
  color: #333;
`;
const DetailContainer = styled.div``;
const DetailFieldContainer = styled(Flex)`
  float: left;
  width: calc(90vw - 20px * 2 - 24px);
  ${breakpoint('desktop')`
    width: calc((1200px - 20px * 2) / 3);
  `};
  padding: 10px 0;
  span {
    color: #333;
  }
`;
const BlockProducersMapContainer = styled.div`
  ${breakpoint('desktop')`
    display: none;
  `};
  ${is('desktop')`
    display: none;
    ${breakpoint('desktop')`
      display: block;
    `};
  `};
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
    const { t, loading, data, producerInfo } = this.props;
    return (
      <Fragment>
        <Spin tip="Connecting" spinning={loading} size="large">
          <Container justifyBetween wrap="true">
            {producerInfo && (
              <Fragment>
                {producerInfo.image && (
                  <BPInfoContainer image>
                    <MainImage src={producerInfo.image} alt={producerInfo.name} />
                  </BPInfoContainer>
                )}
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
                    <article>
                      {(t('locale') === 'en' ? producerInfo.introduction : producerInfo.introductionZh) || ''}
                    </article>
                  </IntroContainer>
                  <DetailContainer>
                    {t('locale') === 'en' &&
                      producerInfo.slogan && (
                        <DetailFieldContainer column>
                          <h3>{t('slogan')}</h3>
                          <span>{producerInfo.slogan}</span>
                        </DetailFieldContainer>
                      )}
                    {t('locale') === 'zh' &&
                      producerInfo.sloganZh && (
                        <DetailFieldContainer column>
                          <h3>{t('slogan')}</h3>
                          <span>{producerInfo.sloganZh}</span>
                        </DetailFieldContainer>
                      )}
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
                    {producerInfo.key && (
                      <DetailFieldContainer column>
                        <h3>{t('key')}</h3>
                        <span>{producerInfo.key}</span>
                      </DetailFieldContainer>
                    )}
                  </DetailContainer>
                  <BlockProducersMapContainer desktop>
                    <BlockProducersMap points={[producerInfo]} />
                  </BlockProducersMapContainer>
                </BPInfoContainer>
              </Fragment>
            )}
            <BPInfoContainer>
              <AccountDashboard data={data} />
            </BPInfoContainer>
            {producerInfo && (
              <BlockProducersMapContainer>
                <BPInfoContainer>
                  <BlockProducersMap points={[producerInfo]} />
                </BPInfoContainer>
              </BlockProducersMapContainer>
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
const frontload = async (props: LoaderProps & Store) => {
  if (!(size(props.producerInfo) > 0)) {
    const currentAccountName = String(props.match.params.accountId);
    return props.getAccountData(currentAccountName);
  }
  return Promise.resolve();
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
