// @flow
import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import prettySize from 'prettysize';

import { Title, ListContainer, More } from '../../Home/styles';

const RankingContainer = styled(ListContainer)`
  margin-top: 20px;
  min-height: 570px;

  th:first-child {
    padding-left: 23px !important;
  }
  td:first-child {
    padding-left: 30px !important;
  }
  & > div:first-child {
    padding: 20px;
  }
`;

type Props = {
  t: Function,
};
const GET_RAM_DATA_DAPP_RAM = gql`
  query GET_RAM_DATA_DAPP_RAM {
    accounts(sortBy: "ram", size: 15) {
      accounts {
        accountName
        eosBalance
        ram {
          max
        }
      }
    }
  }
`;
function Ranking({ t }: Props) {
  return (
    <Query query={GET_RAM_DATA_DAPP_RAM}>
      {({ loading, error, data }) => {
        if (error)
          return (
            <RankingContainer center large>
              {error.message}
            </RankingContainer>
          );
        if (loading)
          return (
            <RankingContainer center large>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </RankingContainer>
          );
        const {
          accounts: { accounts },
        } = data;
        return (
          <RankingContainer column>
            <Title>
              {t('block:ram') + t('LeaderBoard')}
              <Link to="/accounts/ram/">
                <More>{t('More')}</More>
              </Link>
            </Title>
            <Table
              bordered={false}
              scroll={{ x: 550 }}
              size="small"
              dataSource={accounts.map((item, index) => ({ rank: index + 1, ...item }))}
              rowKey="id"
              pagination={false}
            >
              <Table.Column title={t('rank')} dataIndex="rank" key="rank" />
              <Table.Column
                title={t('name')}
                dataIndex="accountName"
                key="accountName"
                render={accountName => <Link to={`/account/${accountName}/`}>{accountName}</Link>}
              />
              <Table.Column
                title={t('ramMax')}
                dataIndex="ram"
                key="ram"
                render={({ max }) => prettySize(max, true, true, 3)}
              />
              <Table.Column
                title={t('eosBalance')}
                dataIndex="eosBalance"
                key="eos"
                render={eosBalance => `${eosBalance} EOS`}
              />
            </Table>
          </RankingContainer>
        );
      }}
    </Query>
  );
}

export default translate(['account', 'block'])(Ranking);
