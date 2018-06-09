// @flow
import { take, flatten, compact, truncate } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { List, Icon, Spin } from 'antd';
import is from 'styled-is';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import breakpoint from 'styled-components-breakpoint';
import numeral from 'numeral';

import { formatTimeStamp } from '../../store/utils';
import type { BlockData } from '../../store/block';
import type { TransactionData } from '../../store/transaction';
import type { AccountData } from '../../store/account';
import type { MessageData } from '../../store/message';
import type { AggregationData } from '../../store/aggregation';
import type { CurrentPriceData } from '../../store/price';

import { Title } from './styles';

import PriceChart from '../PriceChart';
import MappingChecking from '../MappingChecking';

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
  color: #333;
  opacity: 0.9;
  font-size: 32px;
  & h4 {
    color: #333;
    opacity: 0.6;
    font-size: 14px;
    display: inline-flex;
  }

  width: 30vw;
  margin: 5px 0;
  ${breakpoint('desktop')`
    width: unset;
    margin: 0;
  `};

  white-space: nowrap;

  color: #3498db;
`;
const PriceChangeContainer = styled(Flex)`
  font-size: 12px;
  color: #ff6347;
  ${is('up')`
    color: #9acd32;
  `};
  margin-left: 5px;
`;
const ListContainer = styled.div`
  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 50px 0 0;
  `};
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
    padding: 10px 0;
  }
  .ant-list-item-content {
    margin-bottom: 0 !important;
  }

  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
  padding: 20px;
  padding-bottom: 5px;
`;
const KeyInfoContainer = styled(Flex)`
  background-color: gray;
  width: 170px;
  min-width: 170px;
  ${is('larger')`
    width: 180px;
    min-width: 180px;
  `} overflow: hidden;

  height: 70px;
  margin-right: 20px;
  padding: 20px;

  color: white;
  & a {
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }

  white-space: pre-wrap;
`;
const ViewAll = styled(Flex)`
  border: 1px solid gray;
  padding: 5px 13px;
  font-size: 14px;

  cursor: pointer;
  color: gray;
  &:hover {
    background-color: gray;
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
  priceLoading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
  accountData: AccountData[],
  messageData: MessageData[],
  aggregationData: AggregationData,
  currentPriceData: CurrentPriceData,
  priceChartData: number[][],
};
type Dispatch = {
  getBlocksList: (size?: number) => void,
  getTransactionsList: (size?: number) => void,
  getAccountsList: (page?: number) => void,
  getMessagesList: (page?: number) => void,
  getAggregationData: () => void,
  getPriceData: () => void,
};
class OverviewList extends Component<Props & Store & Dispatch> {
  componentDidMount() {
    this.props.getBlocksList();
    this.props.getTransactionsList();
    this.props.getAccountsList();
    this.props.getMessagesList();
    this.props.getAggregationData();
    this.props.getPriceData();
  }

  getAggregationList(data: {
    loading: boolean,
    data: AggregationData,
    priceLoading: boolean,
    currentPriceData: CurrentPriceData,
  }) {
    const priceUp = data.currentPriceData.percentChange24h > 0;
    return (
      <AggregationContainer justifyAround wrap="true">
        <Spin spinning={data.loading}>
          <Link to="/blocks/">
            <AggregationItem column center>
              <h4>{this.props.t('blocksNum')}</h4>
              {data.data.blocksNum}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.loading}>
          <Link to="/transactions/">
            <AggregationItem column center>
              <h4>{this.props.t('transactionNum')}</h4>
              {data.data.transactionNum}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.priceLoading}>
          <Link to="/price/">
            <AggregationItem column center>
              <h4>
                {this.props.t('price')}
                <PriceChangeContainer up={priceUp} center>
                  {priceUp ? '+' : ''}
                  {data.currentPriceData.percentChange24h}%
                </PriceChangeContainer>
              </h4>
              {numeral(data.currentPriceData.priceUsd).format('($ 0.00 a)')}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.priceLoading}>
          <Link to="/price/">
            <AggregationItem column center>
              <h4>{this.props.t('marketCap')}</h4>
              {numeral(data.currentPriceData.marketCapUsd).format('($ 0.00 a)')}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.loading}>
          <Link to="/accounts/">
            <AggregationItem column center>
              <h4>{this.props.t('accountNum')}</h4>
              {data.data.accountNum}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.loading}>
          <Link to="/messages/">
            <AggregationItem column center>
              <h4>{this.props.t('messageNum')}</h4>
              {data.data.messageNum}
            </AggregationItem>
          </Link>
        </Spin>
      </AggregationContainer>
    );
  }

  getBlockList(data: { loading: boolean, data: BlockData[] }) {
    return (
      <ListContainer>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="appstore-o" /> {this.props.t('Blocks')}
          </span>
          <Link to="/blocks/">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: BlockData) => (
            <List.Item>
              <Flex>
                <Link to={`/block/${item.blockNum}/`}>
                  <KeyInfoContainer column justifyAround>
                    <span>{this.props.t('blockNum')}: {item.blockNum}</span>
                    {formatTimeStamp(item.createdAt.sec, this.props.t('locale'), { time: false })}{' '}
                  </KeyInfoContainer>
                </Link>
                <Link to={`/account/${item.producerAccountId}/`}>
                  {this.props.t('producerAccountId')}: {item.producerAccountId}
                </Link>
                {/* {item.transactions.length > 0 && `${this.props.t('Transactions')}: `}
                {item.transactions.map(({ $id }) => (
                  <Link to={`/transaction/${$id}/`}>{truncate($id, { length: 4, omission: ' ' })}</Link>
                ))} */}
              </Flex>
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
          <span>
            <Icon type="right-square-o" /> {this.props.t('Transactions')}
          </span>
          <Link to="/transactions/">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: TransactionData) => (
            <List.Item>
              <Flex>
                <Link to={`/transaction/${item.transactionId}/`}>
                  <KeyInfoContainer larger column justifyAround>
                    <span>{this.props.t('transactionId')}: {truncate(item.transactionId, { length: 12, omission: '...' })}</span>
                    <span>{formatTimeStamp(item.createdAt.sec, this.props.t('locale'), { time: false })}</span>
                  </KeyInfoContainer>
                </Link>
                <Link to={`/block/${item.blockId}/`}>
                  {this.props.t('blockId')}: {truncate(item.blockId, { length: 15, omission: '...' })}
                </Link>
              </Flex>
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
          <span>
            <Icon type="solution" /> {this.props.t('Accounts')}
          </span>
          <Link to="/accounts/">
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
                <Link to={`/account/${item.name}/`}>
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
          <span>
            <Icon type="database" /> {this.props.t('Messages')}
          </span>
          <Link to="/messages/">
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
                <Link to={`/message/${item.transactionId}/`}>
                  {this.props.t('Messages')}: {truncate(item.transactionId, { length: 7, omission: '...' })}
                </Link>,
                <Link to={`/transaction/${item.transactionId}/`}>
                  {this.props.t('transactionId')}: {truncate(item.transactionId, { length: 7, omission: '...' })}
                </Link>,
                ...flatten(
                  item.authorization.map(({ account }) => (
                    <Link to={`/account/${account}/`}>
                      {this.props.t('account')}: {truncate(account, { length: 7, omission: '...' })}
                    </Link>
                  )),
                ),
                item.handlerAccountName !== undefined && (
                  <Link to={`/account/${String(item.handlerAccountName)}/`}>
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
        {this.getAggregationList({
          data: this.props.aggregationData,
          loading: this.props.aggregationLoading,
          priceLoading: this.props.priceLoading,
          currentPriceData: this.props.currentPriceData,
        })}
        <PriceChart data={this.props.priceChartData} />
        <MappingChecking />
        {this.getBlockList({ data: take(this.props.blockData, 6), loading: this.props.blockLoading })}
        {this.getTransactionList({
          data: take(this.props.transactionData, 6),
          loading: this.props.transactionLoading,
        })}
        {this.getAccountList({ data: take(this.props.accountData, 4), loading: this.props.accountLoading })}
        {this.getMessageList({ data: take(this.props.messageData, 6), loading: this.props.messageLoading })}
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
  price: { loading: priceLoading, currentPriceData, priceChartData },
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
  priceLoading,
  currentPriceData,
  priceChartData,
});
const mapDispatch = ({
  block: { getBlocksList },
  transaction: { getTransactionsList },
  account: { getAccountsList },
  message: { getMessagesList },
  aggregation: { getAggregationData },
  price: { getPriceData },
}): Dispatch => ({
  getBlocksList,
  getTransactionsList,
  getAccountsList,
  getMessagesList,
  getAggregationData,
  getPriceData,
});
export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(OverviewList),
);
