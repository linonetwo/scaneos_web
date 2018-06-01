// @flow
import { take, flatten, compact, truncate } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { List } from 'antd';
import is from 'styled-is';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { formatTimeStamp } from '../store/utils';
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
  color: #443f54;
  &:hover {
    background-color: #555;
    color: white;
  }
`;

type Props = {
  t: Function,
};
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
class OverviewList extends Component<Props & Store & Dispatch> {
  componentDidMount() {
    this.props.getBlocksList(10);
    this.props.getTransactionsList(10);
    this.props.getAccountsList(0);
    this.props.getMessagesList(0);
  }

  getBlockList(data: { loading: boolean, data: BlockData[] }) {
    return (
      <ListContainer>
        <Title justifyBetween alignCenter>
          {this.props.t('Blocks')}
          <Link to="/blocks">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: BlockData) => (
            <List.Item
              actions={[
                <Link to={`/account/${item.producerAccountId}`}>
                  {this.props.t('producerAccountId')}: {item.producerAccountId}
                </Link>,
                <Link to={`/block/${item.blockNum}`}>
                  {this.props.t('blockNum')}: {item.blockNum}
                </Link>,
              ]}
            >
              <div>
                {formatTimeStamp(item.createdAt.sec, this.props.t('locale'))}{' '}
                {item.transactions.length > 0 && `${this.props.t('Transactions')}: `}
                {item.transactions.map(({ $id }) => (
                  <Link to={`/transaction/${$id}`}>{truncate($id, { length: 4, omission: ' ' })}</Link>
                ))}
              </div>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }
  getTransactionList(data: { loading: boolean, data: TransactionData[] }) {
    return (
      <ListContainer>
        <Title justifyBetween alignCenter>
          {this.props.t('Transactions')}
          <Link to="/transactions">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: TransactionData) => (
            <List.Item
              actions={[
                <Link to={`/transaction/${item.transactionId}`}>
                  {this.props.t('transactionId')}: {truncate(item.transactionId, { length: 20, omission: '...' })}
                </Link>,
                <Link to={`/block/${item.blockId}`}>
                  {this.props.t('blockId')}: {truncate(item.blockId, { length: 20, omission: '...' })}
                </Link>,
              ]}
            >
              <div>{formatTimeStamp(item.createdAt.sec, this.props.t('locale'))}</div>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }

  getAccountList(data: { loading: boolean, data: AccountData[] }) {
    return (
      <ListContainer small>
        <Title justifyBetween alignCenter>
          {this.props.t('Accounts')}
          <Link to="/accounts">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: AccountData) => (
            <List.Item
              actions={[
                <Link to={`/account/${item.name}`}>
                  {this.props.t('name')}: {item.name}
                </Link>,
              ]}
            >
              <div>
                {this.props.t('createdAt')}: {formatTimeStamp(item.createdAt.sec, this.props.t('locale'))}
              </div>
              <div>
                {this.props.t('updatedAt')}: {formatTimeStamp(item.updatedAt.sec, this.props.t('locale'))}
              </div>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }

  getMessageList(data: { loading: boolean, data: MessageData[] }) {
    return (
      <ListContainer small>
        <Title justifyBetween alignCenter>
          {this.props.t('Messages')}
          <Link to="/messages">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: MessageData) => (
            <List.Item
              actions={compact([
                <Link to={`/transaction/${item.transactionId}`}>
                  {this.props.t('transactionId')}: {truncate(item.transactionId, { length: 10, omission: '...' })}
                </Link>,
                ...flatten(
                  item.authorization.map(({ account }) => (
                    <Link to={`/account/${account}`}>
                      {this.props.t('account')}: {truncate(account, { length: 10, omission: '...' })}
                    </Link>
                  )),
                ),
                item.handlerAccountName !== undefined && (
                  <Link to={`/account/${String(item.handlerAccountName)}`}>
                    {this.props.t('handlerAccountName')}: {item.handlerAccountName}
                  </Link>
                ),
              ])}
            >
              <div>{formatTimeStamp(item.createdAt.sec, this.props.t('locale'))}</div>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }

  render() {
    return (
      <Container alignCenter justifyAround wrap="true">
        {this.getBlockList({ data: take(this.props.blockData, 10), loading: this.props.loading })}
        {this.getTransactionList({ data: take(this.props.transactionData, 10), loading: this.props.loading })}
        {this.getAccountList({ data: take(this.props.accountData, 4), loading: this.props.loading })}
        {this.getMessageList({ data: take(this.props.messageData, 5), loading: this.props.loading })}
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
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(OverviewList),
);
