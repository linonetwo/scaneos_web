// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import prettySize from 'prettysize';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

import { Spin, Table } from 'antd';

const AggregationContainer = styled(Flex)`
  width: 90vw;
  & > a {
    width: calc((90vw - 20px * 2) / 2);
  }
  margin: 24px auto 0;
  padding: 5px 10px;
  ${breakpoint('desktop')`
    width: 1200px;
    & > a {
      width: calc((1200px - 20px * 2) / 6);
    }
    margin: 20px 0 0;
    padding: 10px;
  `};
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
`;

const Container = styled.div`
  margin-top: 10px;
  background-color: white;
  box-shadow: 0 0 1px #dddee1;
`; 

const Header = styled.div`
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  color: #000;
  border-bottom: 0.5px solid #dddee1;
  padding-left: 20px;
`;

const Footer = styled.a`
  display: inline-block;
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #000;
  border: none;
  border-top: 0.5px solid #dddee1;
  width: 100%;
  cursor: pointer;
`;

type Props = {
  t: Function,
  query: Object,
  title: string,
  type: string,
};

class TopList extends PureComponent<Props> {
  render() {
    const { t, query, title, type } = this.props;

    return (
      <Container>
        <Header>{title}</Header>
        <Query query={query} variables={{ sortBy: 'eos' }} notifyOnNetworkStatusChange>
          {({ loading, error, data }) => {
            if (error) 
              return  (
                <AggregationContainer center>
                  {error.message}
                </AggregationContainer>
              );
            if (loading)
            return (
              <AggregationContainer center>
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </AggregationContainer>
            );
            const {
              accounts: {
                accounts,
              },
            } = data;
            return (
              <Table
                scroll={{ x: 1200 }}
                size="middle"
                dataSource={accounts}
                rowKey="id"
                pagination={false}
              >
                <Table.Column
                  title={t('name')}
                  dataIndex="accountName"
                  key="accountName"
                  render={accountName => <Link to={`/account/${accountName}/`}>{accountName}</Link>}
                />
                <Table.Column
                  title={t('eosBalance')}
                  dataIndex="eosBalance"
                  key="eos"
                  render={eosBalance => `${eosBalance} EOS`}
                />
                <Table.Column
                  title={t('eosStaked')}
                  dataIndex="eosStaked"
                  key="staked"
                  render={eosStaked => `${eosStaked} EOS`}
                />
                <Table.Column
                  title={t('ramMax')}
                  dataIndex="ram"
                  key="ram"
                  render={({ max }) => prettySize(max, true, true, 3)}
                />
                <Table.Column
                  title={t('netWeight')}
                  dataIndex="net"
                  key="net"
                  render={({ weight }) => `${weight} EOS`}
                />
                <Table.Column
                  title={t('cpuWeight')}
                  dataIndex="cpu"
                  key="cpu"
                  render={({ weight }) => `${weight} EOS`}
                />
              </Table>
            );
          }}
        </Query>
        <Footer href={`/accounts/${type}`}>{t('moreInfo')}</Footer>
      </Container>
    );
  }
}
export default translate('account')(TopList);
