// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import breakpoint from 'styled-components-breakpoint';
import { Spin, Avatar, Table } from 'antd';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import AutoLinkText from 'react-autolink-text2';
import Loadable from 'react-loadable';

import { Title } from '../Home/styles';
import Loading from '../../components/Loading';
import { BPInfoContainer } from '../../components/Containers';
import { GET_ACCOUNT_DETAIL, GET_ACCOUNT_ACTIONS, getAccountDetails } from '../Account/index';
import ActionsList from '../Action/ActionsList';

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
  ${breakpoint('desktop')`
    height: 500px;
  `};

  object-fit: contain;
  object-position: center;
  font-family: 'object-fit: contain; object-position: center;';
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
  padding: 10px 0 20px;
  h3 {
    margin: 0;
  }
  span {
    color: #333;
    word-wrap: break-word;
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
  match: {
    params: {
      accountName: string,
    },
  },
};
class BlockProducer extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { accountName } = match.params;
    return (
      <Query query={GET_ACCOUNT_DETAIL} variables={{ name: accountName }}>
        {({ loading, error, data }) => {
          if (error) return <Container>{error.message}</Container>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <Container />
              </Spin>
            );
          if (!data.account) return <Container>{t('noResult')}</Container>;
          const {
            account: { producerInfo, ...account },
          } = data;
          return (
            <Fragment>
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
                          <Avatar src={producerInfo.logo} /> {t('BlockProducers')}{' '}
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
                        {producerInfo.contact && (
                          <DetailFieldContainer column>
                            <h3>{t('contact')}</h3>
                            {producerInfo.contact.split('\n').map(text => <AutoLinkText key={text} text={text} />)}
                          </DetailFieldContainer>
                        )}
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
                        {producerInfo.location && (
                          <DetailFieldContainer column>
                            <h3>{t('location')}</h3>
                            <span>{producerInfo.location}</span>
                          </DetailFieldContainer>
                        )}
                        {producerInfo.organization && (
                          <DetailFieldContainer column>
                            <h3>{t('organization')}</h3>
                            <span>{producerInfo.organization}</span>
                          </DetailFieldContainer>
                        )}
                        {producerInfo.key && (
                          <DetailFieldContainer column>
                            <h3>{t('key')}</h3>
                            <span>{producerInfo.key}</span>
                          </DetailFieldContainer>
                        )}
                      </DetailContainer>

                      {producerInfo &&
                        typeof producerInfo.longitude === 'number' &&
                        typeof producerInfo.latitude === 'number' && (
                          <BlockProducersMapContainer desktop>
                            <BlockProducersMap points={[producerInfo]} />
                          </BlockProducersMapContainer>
                        )}
                    </BPInfoContainer>
                    {producerInfo.nodes && (
                      <BPInfoContainer>
                        <DetailContainer column>
                          <h3>{t('nodes')}</h3>
                          <Table scroll={{ x: 500 }} size="middle" pagination={false} dataSource={producerInfo.nodes}>
                            <Table.Column
                              title={t('location')}
                              dataIndex="location"
                              key="location"
                              render={({ name }) => name}
                            />
                            <Table.Column
                              title={t('isProducer')}
                              dataIndex="isProducer"
                              key="isProducer"
                              render={isProducer => t(String(isProducer))}
                            />
                            <Table.Column title={t('apiEndpoint')} dataIndex="apiEndpoint" key="apiEndpoint" />
                            <Table.Column title={t('sslEndpoint')} dataIndex="sslEndpoint" key="sslEndpoint" />
                            <Table.Column title={t('p2pEndpoint')} dataIndex="p2pEndpoint" key="p2pEndpoint" />
                          </Table>
                        </DetailContainer>
                      </BPInfoContainer>
                    )}
                  </Fragment>
                )}
                <BPInfoContainer>
                  {getAccountDetails(account, t)}
                  <Query ssr={false} query={GET_ACCOUNT_ACTIONS} variables={{ name: accountName }}>
                    {({ loading: actionsLoading, error: actionsError, data: actionsData }) => {
                      if (error) return actionsError.message;
                      if (actionsLoading) return <Flex center><Spin tip={t('Connecting')} spinning={actionsLoading} size="large" /></Flex>;
                      const {
                        account: {
                          actions: { actions },
                        },
                      } = actionsData;
                      return <ActionsList actions={actions} />;
                    }}
                  </Query>
                </BPInfoContainer>
                {producerInfo &&
                  typeof producerInfo.longitude === 'number' &&
                  typeof producerInfo.latitude === 'number' && (
                    <BlockProducersMapContainer>
                      <BPInfoContainer>
                        <BlockProducersMap points={[producerInfo]} />
                      </BPInfoContainer>
                    </BlockProducersMapContainer>
                  )}
              </Container>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(translate('bp')(BlockProducer));
