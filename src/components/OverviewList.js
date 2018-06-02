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
import breakpoint from 'styled-components-breakpoint';

import { formatTimeStamp } from '../store/utils';
import type { BlockData } from '../store/block';
import type { TransactionData } from '../store/transaction';
import type { AccountData } from '../store/account';
import type { MessageData } from '../store/message';
import type { AggregationData } from '../store/aggregation';

const Container = styled(Flex)`
  width: 1100px;
  padding-bottom: 50px;
`;
const AggregationContainer = styled(Flex)`
  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 1050px;
    margin: 50px 0 0;
  `};
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(7, 17, 27, 0.05);
`;
const AggregationItem = styled(Flex)`
  color: rgba(68, 63, 84, 0.9);
  font-size: 24px;
  & h4 {
    color: rgba(68, 63, 84, 0.6);
    font-size: 14px;
  }
`;
const ListContainer = styled.div`
  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 50px 0 0;
  `};
  height: 840px;
  ${is('small')`
    height: 440px;
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
const BlockNumberContainer = styled(Flex)`
  background-color: #443f54;
  color: white;
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
  blockLoading: boolean,
  transactionLoading: boolean,
  accountLoading: boolean,
  messageLoading: boolean,
  aggregationLoading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
  accountData: AccountData[],
  messageData: MessageData[],
  aggregationData: AggregationData,
};
type Dispatch = {
  getBlocksList: (size?: number) => void,
  getTransactionsList: (size?: number) => void,
  getAccountsList: (page?: number) => void,
  getMessagesList: (page?: number) => void,
  getAggregationData: () => void,
};
class OverviewList extends Component<Props & Store & Dispatch> {
  componentDidMount() {
    this.props.getBlocksList(10);
    this.props.getTransactionsList(10);
    this.props.getAccountsList(0);
    this.props.getMessagesList(0);
    this.props.getAggregationData();
  }

  getAggregationList(data: { loading: boolean, data: AggregationData }) {
    return (
      <AggregationContainer justifyAround>
        <AggregationItem column center>
          <h4>{this.props.t('blocksNum')}</h4>
          {data.data.blocksNum}
        </AggregationItem>
        <AggregationItem column center>
          <h4>{this.props.t('transactionNum')}</h4>
          {data.data.transactionNum}
        </AggregationItem>
        <AggregationItem column center>
          <h4>{this.props.t('accountNum')}</h4>
          {data.data.accountNum}
        </AggregationItem>
        <AggregationItem column center>
          <h4>{this.props.t('messageNum')}</h4>
          {data.data.messageNum}
        </AggregationItem>
      </AggregationContainer>
    );
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
              <BlockNumberContainer column>
              {formatTimeStamp(item.createdAt.sec, this.props.t('locale'), { time: false })}{' '}
              </BlockNumberContainer>
                
                {/* {item.transactions.length > 0 && `${this.props.t('Transactions')}: `}
                {item.transactions.map(({ $id }) => (
                  <Link to={`/transaction/${$id}`}>{truncate($id, { length: 4, omission: ' ' })}</Link>
                ))} */}
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
                <Link to={`/message/${item.transactionId}`}>
                  {this.props.t('Messages')}: {truncate(item.transactionId, { length: 7, omission: '...' })}
                </Link>,
                <Link to={`/transaction/${item.transactionId}`}>
                  {this.props.t('transactionId')}: {truncate(item.transactionId, { length: 7, omission: '...' })}
                </Link>,
                ...flatten(
                  item.authorization.map(({ account }) => (
                    <Link to={`/account/${account}`}>
                      {this.props.t('account')}: {truncate(account, { length: 7, omission: '...' })}
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
        {this.getAggregationList({ data: this.props.aggregationData, loading: this.props.aggregationLoading })}
        {this.getBlockList({ data: take(this.props.blockData, 10), loading: this.props.blockLoading })}
        {this.getTransactionList({
          data: take(this.props.transactionData, 10),
          loading: this.props.transactionLoading,
        })}
        {this.getAccountList({ data: take(this.props.accountData, 4), loading: this.props.accountLoading })}
        {this.getMessageList({ data: take(this.props.messageData, 5), loading: this.props.messageLoading })}
      </Container>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, list: blockData },
  transaction: { loading: transactionLoading, list: transactionData },
  account: { loading: accountLoading, list: accountData },
  message: { loading: messageLoading, list: messageData },
  aggregation: { loading: aggregationLoading, data: aggregationData },
}): Store => ({
  blockData,
  transactionData,
  accountData,
  messageData,
  aggregationData,
  blockLoading,
  transactionLoading,
  accountLoading,
  messageLoading,
  aggregationLoading,
});
const mapDispatch = ({
  block: { getBlocksList },
  transaction: { getTransactionsList },
  account: { getAccountsList },
  message: { getMessagesList },
  aggregation: { getAggregationData },
}): Dispatch => ({ getBlocksList, getTransactionsList, getAccountsList, getMessagesList, getAggregationData });
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(OverviewList),
);
