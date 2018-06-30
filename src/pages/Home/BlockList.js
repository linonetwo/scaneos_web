// @flow
import React from 'react';
import { List, Icon, Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { formatTimeStamp } from '../../store/utils';

import { Title, ListContainer, ViewAll, KeyInfoItemContainer, KeyInfoContainer } from './styles';

type Props = {
  t: Function,
};
const GET_BLOCKS = gql`
  {
    blocks(size: 5) {
      blocks {
        blockNum
        timestamp
        producerAccountID
      }
    }
  }
`;
function BlockList({ t }: Props) {
  return (
    <Query query={GET_BLOCKS} pollInterval={3000}>
      {({ loading, error, data }) => {
        if (error) return <ListContainer>{error.message}</ListContainer>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <ListContainer />
            </Spin>
          );
        const {
          blocks: { blocks },
        } = data;
        return (
          <ListContainer>
            <Title justifyBetween alignCenter>
              <span>
                <Icon type="appstore-o" /> {t('Blocks')}
              </span>
              <Link to="/blocks/">
                <ViewAll>{t('ViewAll')}</ViewAll>
              </Link>
            </Title>
            <List
              size="small"
              itemLayout="vertical"
              dataSource={blocks}
              renderItem={item => (
                <List.Item>
                  <KeyInfoItemContainer>
                    <Link to={`/block/${item.blockNum}/`}>
                      <KeyInfoContainer column justifyAround>
                        <span>
                          {t('blockNum')}: {item.blockNum}
                        </span>
                        {formatTimeStamp(item.timestamp, t('locale'), { distance: false })}{' '}
                      </KeyInfoContainer>
                    </Link>
                    <Link to={`/account/${item.producerAccountID}/`}>
                      {t('producerAccountID')}: {item.producerAccountID}
                    </Link>
                  </KeyInfoItemContainer>
                </List.Item>
              )}
            />
          </ListContainer>
        );
      }}
    </Query>
  );
}

export default translate('block')(BlockList);
