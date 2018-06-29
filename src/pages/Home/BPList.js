// @flow
import { toUpper } from 'lodash';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import numeral from 'numeral';

import { Title, ListContainer, ViewAll } from './styles';

type Props = {
  t: Function,
};
const GET_BP_LIST = gql`
  {
    producers {
      rank
      name
      account
      totalVotes
    }
    status {
      totalProducerVoteWeight
    }
  }
`;
function BPList({ t }: Props) {
  return (
    <Query query={GET_BP_LIST}>
      {({ loading, error, data }) => {
        if (error) return <ListContainer large>{error.message}</ListContainer>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <ListContainer large />
            </Spin>
          );
        const {
          producers,
          status: { totalProducerVoteWeight },
        } = data;
        return (
          <ListContainer large>
            <Title justifyBetween alignCenter>
              <span>
                <Icon type="solution" /> {t('BlockProducers')}
              </span>
              <Link to="/producers/">
                <ViewAll>{t('ViewAll')}</ViewAll>
              </Link>
            </Title>
            <Table
              pagination={{
                pageSize: 21,
              }}
              size="small"
              dataSource={producers}
              scroll={{ x: 450 }}
            >
              <Table.Column width={5} title={t('rank')} dataIndex="rank" key="rank" />
              <Table.Column
                width={70}
                title={t('name')}
                dataIndex="name"
                key="name"
                render={(name, { account }) => <Link to={`/producer/${account}`}>{name || toUpper(account)}</Link>}
              />
              <Table.Column
                width={50}
                title={t('EOSVotes')}
                dataIndex="totalVotes"
                key="totalVotes"
                render={totalVotes =>
                  totalProducerVoteWeight > 0
                    ? `${numeral(Number(totalVotes) / totalProducerVoteWeight).format('0.00%')}`
                    : ''
                }
              />
              <Table.Column
                width={70}
                title={t('account')}
                dataIndex="account"
                key="account"
                render={account => <Link to={`/producer/${account}`}>{account}</Link>}
              />
            </Table>
          </ListContainer>
        );
      }}
    </Query>
  );
}

export default translate('bp')(BPList);
