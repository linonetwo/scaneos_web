// @flow
import { toUpper } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import numeral from 'numeral';

import { Title, ListContainer, More } from './styles';

const BPListContainer = styled(ListContainer)`
  margin-top: 20px;
  height: 730px;


  th:first-child {
    padding-left: 23px !important;
  }
  td:first-child {
    padding-left: 30px !important;
  }
`;

type Props = {
  t: Function,
};
const GET_BP_LIST_HOME_PAGE = gql`
  query GET_BP_LIST_HOME_PAGE {
    producers(size: 21) {
      producers {
        rank
        name
        account
        totalVotes
      }
    }
    status {
      totalProducerVoteWeight
    }
  }
`;
function BPList({ t }: Props) {
  return (
    <Query query={GET_BP_LIST_HOME_PAGE}>
      {({ loading, error, data }) => {
        if (error)
          return (
            <BPListContainer center large>
              {error.message}
            </BPListContainer>
          );
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <BPListContainer center large />
            </Spin>
          );
        const {
          producers: { producers },
          status: { totalProducerVoteWeight },
        } = data;
        return (
          <BPListContainer column large>
            <Title justifyBetween alignCenter>
              <span>{t('BlockProducers')}</span>
              <Link to="/producers/">
                <More>{t('More')}</More>
              </Link>
            </Title>
            <Table
              pagination={false}
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
          </BPListContainer>
        );
      }}
    </Query>
  );
}

export default translate('bp')(BPList);
