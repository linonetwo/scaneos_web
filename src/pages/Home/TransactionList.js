// @flow
import { truncate } from 'lodash';
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
const GET_TRANSACTIONS = gql`
  {
    transactions(size: 5) {
      transactions {
        transactionID
        createdAt
        blockID
        status
        pending
      }
    }
  }
`
function TransactionList({ t }: Props) {
  return (
    <Query query={GET_TRANSACTIONS} pollInterval={3000}>
      {({ loading, error, data }) => {
        if (error) return <ListContainer>{error.message}</ListContainer>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <ListContainer />
            </Spin>
          );
        const {
          transactions: { transactions },
        } = data;
        return (
          <ListContainer>
            <Title justifyBetween alignCenter>
              <span>
                <Icon type="right-square-o" /> {t('Transactions')}
              </span>
              <Link to="/transactions/">
                <ViewAll>{t('ViewAll')}</ViewAll>
              </Link>
            </Title>
            <List
              size="small"
              itemLayout="vertical"
              dataSource={transactions}
              renderItem={(item) => (
                <List.Item>
                  <KeyInfoItemContainer>
                    <Link to={`/transaction/${item.transactionID}/`}>
                      <KeyInfoContainer larger column justifyAround>
                        <span>
                          {t('transactionID')}: {truncate(item.transactionID, { length: 9, omission: '...' })}
                        </span>
                        <span>{formatTimeStamp(item.createdAt, t('locale'), { distance: false })}</span>
                      </KeyInfoContainer>
                    </Link>
                    <div style={{ textAlign: 'left' }}>
                      <div>
                        <Link to={`/block/${item.blockID}/?tab=transactions`}>
                          {t('blockID')}: {truncate(item.blockID, { length: 15, omission: '...' })}
                        </Link>
                      </div>
                      <div>
                        {t('status')}: {item.status}
                      </div>
                      <div>
                        {t('pending')}: {String(item.pending)}
                      </div>
                    </div>
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

export default translate('transaction')(TransactionList);
