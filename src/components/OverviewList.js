// @flow
import { take } from 'lodash'
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { List } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { format } from 'date-fns';

import type { BlockData } from '../store/block';
import type { TransactionData } from '../store/transaction';
import type { AccountData } from '../store/account';

const Container = styled(Flex)`
  width: 1100px;
`;
const ListContainer = styled.div`
  margin: 0;
  width: 500px;
  height: 815px;
  .ant-list {
    margin: 0;
  }
  .ant-list-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px;
  }

  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
  padding-top: 20px;
`;
const Title = styled(Flex)`
  width: 100%;
  font-size: 20px;
  padding: 0 10px;
`;
const ViewAll = styled(Flex)`
  border: 1px solid #555;
  padding: 5px 13px;
  font-size: 14px;

  cursor: pointer;
  &:hover {
    background-color: #555;
    color: white;
  }
`;

export function BlockList(props: { loading: boolean, data: BlockData[] }) {
  return (
    <ListContainer>
      <Title justifyBetween alignCenter>
        Blocks<ViewAll>View All</ViewAll>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: BlockData) => (
          <List.Item actions={[<a>By: {item.producerAccountId}</a>, <a>{item.blockId}</a>]}>
            <div>
              {format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')} {JSON.stringify(item.transactions)}
            </div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}
export function TransactionList(props: { loading: boolean, data: TransactionData[] }) {
  return (
    <ListContainer>
      <Title justifyBetween alignCenter>
        Transactions<ViewAll>View All</ViewAll>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: TransactionData) => (
          <List.Item actions={[<a>{item.transactionId}</a>, <a>{item.blockId}</a>]}>
            <div>{format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

export function AccountList(props: { loading: boolean, data: AccountData[] }) {
  return (
    <ListContainer>
      <Title justifyBetween alignCenter>
        Accounts<ViewAll>View All</ViewAll>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: AccountData) => (
          <List.Item actions={[<a>{item.transactionId}</a>, <a>{item.blockId}</a>]}>
            <div>{format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

type Store = {
  blockLoading: boolean,
  transactionLoading: boolean,
  accountLoading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
  accountData: AccountData[],
};
type Dispatch = {
  getBlockData: (size?: number) => void,
  getTransactionData: (size?: number) => void,
  getAccountData: (page?: number) => void,
};
class OverviewList extends Component<Store & Dispatch> {
  componentDidMount() {
    this.props.getBlockData(10);
    this.props.getTransactionData(10);
    this.props.getAccountData(0);
  }

  render() {
    return (
      <Container alignCenter justifyAround wrap>
        <BlockList loading={this.props.blockLoading} data={this.props.blockData} />
        <TransactionList loading={this.props.transactionLoading} data={this.props.transactionData} />
        <AccountList loading={this.props.accountLoading} data={take(this.props.accountData, 10)} />
      </Container>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, data: blockData },
  transaction: { loading: transactionLoading, data: transactionData },
  account: { loading: accountLoading, data: accountData },
}): Store => ({ blockLoading, blockData, transactionLoading, transactionData, accountLoading, accountData });
const mapDispatch = ({
  block: { getBlockData },
  transaction: { getTransactionData },
  account: { getAccountData },
}): Dispatch => ({ getBlockData, getTransactionData, getAccountData });
export default connect(
  mapState,
  mapDispatch,
)(OverviewList);
