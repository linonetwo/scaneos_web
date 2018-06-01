// @flow
import { take } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { List } from 'antd';
import is from 'styled-is';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { format } from 'date-fns';

import type { BlockData } from '../store/block';
import type { TransactionData } from '../store/transaction';
import type { AccountData } from '../store/account';
import type { MessageData } from '../store/message';

const Container = styled(Flex)`
  width: 1100px;
`;
const ListContainer = styled.div`
  margin: 0;
  margin-top: 50px;
  width: 500px;
  height: 815px;
  ${is('small')`
    height: 435px;
  `};
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
        Blocks<Link to="/blocks">
          <ViewAll>View All</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: BlockData) => (
          <List.Item
            actions={[
              <Link to={`/account/${item.producerAccountId}`}>By: {item.producerAccountId}</Link>,
              <Link to={`/block/${item.blockNum}`}>{item.blockNum}</Link>,
            ]}
          >
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
        Transactions<Link to="/transactions">
          <ViewAll>View All</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: TransactionData) => (
          <List.Item
            actions={[
              <Link to={`/transaction/${item.transactionId}`}>{item.transactionId}</Link>,
              <Link to={`/block/${item.blockId}`}>{item.blockId}</Link>,
            ]}
          >
            <div>{format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

export function AccountList(props: { loading: boolean, data: AccountData[] }) {
  return (
    <ListContainer small>
      <Title justifyBetween alignCenter>
        Accounts<Link to="/accounts">
          <ViewAll>View All</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: AccountData) => (
          <List.Item
            actions={[
              <Link to={`/transaction/${item.transactionId}`}>{item.transactionId}</Link>,
              <Link to={`/block/${item.blockId}`}>{item.blockId}</Link>,
            ]}
          >
            <div>{format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

export function MessageList(props: { loading: boolean, data: MessageData[] }) {
  return (
    <ListContainer small>
      <Title justifyBetween alignCenter>
        Messages<Link to="/messages">
          <ViewAll>View All</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.data}
        renderItem={(item: MessageData) => (
          <List.Item
            actions={[
              <Link to={`/transaction/${item.transactionId}`}>{item.transactionId}</Link>,
              <Link to={`/block/${item.blockId}`}>{item.blockId}</Link>,
            ]}
          >
            <div>{format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

type Store = {
  loading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
  accountData: AccountData[],
  messageData: MessageData[],
};
type Dispatch = {
  getBlocksList: (size?: number) => void,
  getTransactionsList: (size?: number) => void,
  getAccountsList: (page?: number) => void,
  getMessagesList: (page?: number) => void,
};
class OverviewList extends Component<Store & Dispatch> {
  componentDidMount() {
    this.props.getBlocksList(10);
    this.props.getTransactionsList(10);
    this.props.getAccountsList(0);
    this.props.getMessagesList(0);
  }

  render() {
    return (
      <Container alignCenter justifyAround wrap="true">
        <BlockList loading={this.props.loading} data={take(this.props.blockData, 10)} />
        <TransactionList loading={this.props.loading} data={take(this.props.transactionData, 10)} />
        <AccountList loading={this.props.loading} data={take(this.props.accountData, 5)} />
        <MessageList loading={this.props.loading} data={take(this.props.messageData, 5)} />
      </Container>
    );
  }
}

const mapState = ({
  block: { list: blockData },
  transaction: { list: transactionData },
  account: { list: accountData },
  message: { list: messageData },
  info: { loading },
}): Store => ({
  loading,
  blockData,
  transactionData,
  accountData,
  messageData,
});
const mapDispatch = ({
  block: { getBlocksList },
  transaction: { getTransactionsList },
  account: { getAccountsList },
  message: { getMessagesList },
}): Dispatch => ({ getBlocksList, getTransactionsList, getAccountsList, getMessagesList });
export default connect(
  mapState,
  mapDispatch,
)(OverviewList);
