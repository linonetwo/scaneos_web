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
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { BlockData } from '../../store/block';
import type { TransactionData } from '../../store/transaction';
import type { BPAccount } from '../../store/account';
import type { MessageData } from '../../store/message';
import type { AggregationData } from '../../store/aggregation';
import type { CurrentPriceData } from '../../store/price';

import { Title } from './styles';

import PriceChart from '../../components/PriceChart';
import VotingProgress from '../../components/VotingProgress';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  padding-bottom: 50px;
  margin: auto;
  text-align: center;
  width: 90vw;
  ${breakpoint('desktop')`
    width: 1100px;
  `};
`;
const AggregationContainer = styled(Flex)`
  width: 90vw;
  & .ant-spin-nested-loading {
    width: calc((90vw - 20px * 2) / 2);
  }
  margin: 10px auto 0;
  padding: 5px 10px;
  ${breakpoint('desktop')`
    width: 1050px;
    & .ant-spin-nested-loading {
      width: calc((1050px - 20px * 2) / 5);
    }
    margin: 20px 0 0;
    padding: 10px;
  `};
  padding: 5px 10px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(7, 17, 27, 0.05);
`;
const AggregationItem = styled(Flex)`
  color: #333;
  opacity: 0.9;
  font-size: 18px;
  & h4 {
    color: #333;
    opacity: 0.6;
    font-size: 14px;
    display: inline-flex;
  }

  width: calc((90vw - 20px * 2) / 2);
  margin: 5px auto;
  ${breakpoint('desktop')`
    width: unset;
    margin: 0;
    font-size: 27px;
  `};

  white-space: nowrap;

  font-family: Courier;
  &:hover {
    opacity: 0.5;
  }
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
    height: 820px;
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
const KeyInfoItemContainer = styled(Flex)`
  flex-direction: column;
  ${breakpoint('desktop')`
    flex-direction: row;
  `};
`;
const KeyInfoContainer = styled(Flex)`
  background-color: gray;
  width: 100%;
  ${breakpoint('desktop')`
    width: 170px;
    min-width: 170px;
    ${is('larger')`
      width: 180px;
      min-width: 180px;
    `};
  `};

  overflow: hidden;

  height: 70px;
  margin: 10px 0;
  ${breakpoint('desktop')`
    margin: 0;
    margin-right: 20px;
  `};
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
const MessagePreview = styled.div`
  & a + a {
    margin-left: 10px;
  }
  margin-top: 5px;
  margin-bottom: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  producerAccountList: BPAccount[],
  messageData: MessageData[],
  aggregationData: AggregationData,
  currentPriceData: CurrentPriceData,
  priceChartData: number[][],
  totalActivatedStake: number,
};
type Dispatch = {
  getBlocksList: (size?: number) => void,
  getTransactionsList: (size?: number) => void,
  getBPAccountsList: (page?: number) => void,
  getMessagesList: (page?: number) => void,
  getAggregationData: () => void,
  getPriceData: () => void,
  getVoting: () => void,
};
class Home extends Component<Props & Store> {
  getAggregationList(data: {
    loading: boolean,
    data: AggregationData,
    priceLoading: boolean,
    currentPriceData: CurrentPriceData,
  }) {
    const priceUp = data.currentPriceData.percentChange24h > 0;
    return (
      <AggregationContainer wrap="true">
        <Spin spinning={data.loading}>
          <Link to="/blocks/">
            <AggregationItem column center>
              <h4>{this.props.t('blocksNum')}</h4>
              {data.data.blockNumber}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.loading}>
          <Link to="/transactions/">
            <AggregationItem column center>
              <h4>{this.props.t('transactionNum')}</h4>
              {data.data.transactionNumber}
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
              {numeral(data.currentPriceData.priceUsd)
                .format('($0.00 a)')
                .replace('b', 'B')}
            </AggregationItem>
          </Link>
        </Spin>
        <Spin spinning={data.priceLoading}>
          <Link to="/price/">
            <AggregationItem column center>
              <h4>{this.props.t('marketCap')}</h4>
              {numeral(data.currentPriceData.marketCapUsd)
                .format('($0.00 a)')
                .replace('b', 'B')}
            </AggregationItem>
          </Link>
        </Spin>
        {/* <Spin spinning={data.loading}>
          <Link to="/accounts/">
            <AggregationItem column center>
              <h4>{this.props.t('accountNum')}</h4>
              {data.data.accountNumber}
            </AggregationItem>
          </Link>
        </Spin> */}
        <Spin spinning={data.loading}>
          <Link to="/messages/">
            <AggregationItem column center>
              <h4>{this.props.t('messageNum')}</h4>
              {data.data.actionNumber}
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
              <KeyInfoItemContainer>
                <Link to={`/block/${item.blockNum}/`}>
                  <KeyInfoContainer column justifyAround>
                    <span>
                      {this.props.t('blockNum')}: {item.blockNum}
                    </span>
                    {formatTimeStamp(item.timestamp, this.props.t('locale'), { distance: false })}{' '}
                  </KeyInfoContainer>
                </Link>
                <Link to={`/account/${item.producerAccountId}/`}>
                  {this.props.t('producerAccountId')}: {item.producerAccountId}
                </Link>
              </KeyInfoItemContainer>
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
              <KeyInfoItemContainer>
                <Link to={`/transaction/${item.transactionId}/`}>
                  <KeyInfoContainer larger column justifyAround>
                    <span>
                      {this.props.t('transactionId')}: {truncate(item.transactionId, { length: 9, omission: '...' })}
                    </span>
                    <span>{formatTimeStamp(item.createdAt, this.props.t('locale'), { distance: false })}</span>
                  </KeyInfoContainer>
                </Link>
                <div>
                  <div>
                    <Link to={`/block/${item.blockId}/?tab=transactions`}>
                      {this.props.t('blockId')}: {truncate(item.blockId, { length: 15, omission: '...' })}
                    </Link>
                  </div>
                  <div>
                    {this.props.t('status')}: {item.status}
                  </div>
                  <div>
                    {this.props.t('pending')}: {String(item.pending)}
                  </div>
                </div>
              </KeyInfoItemContainer>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }

  getAccountList(data: { loading: boolean, data: BPAccount[] }) {
    return (
      <ListContainer small>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="solution" /> {this.props.t('Accounts')}
          </span>
          <Link to="/producers/">
            <ViewAll>{this.props.t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={data.loading}
          itemLayout="vertical"
          dataSource={data.data}
          renderItem={(item: BPAccount) => (
            <List.Item>
              <MessagePreview>
                {this.props.t('EOSVotes')}: {Number(item.totalVotes).toFixed(2)} EOS
              </MessagePreview>
              <MessagePreview>
                <Link to={`/account/${item.owner}/`}>
                  {this.props.t('accountName')}: {item.owner}
                </Link>
              </MessagePreview>
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
            <List.Item>
              <MessagePreview>
                <Link to={`/message/${item.transactionId}/`}>
                  {this.props.t('Messages')}: {item.transactionId}
                </Link>
              </MessagePreview>
              <MessagePreview>
                <Link to={`/transaction/${item.transactionId}/`}>
                  {this.props.t('transactionId')}: {item.transactionId}
                </Link>
              </MessagePreview>
              <MessagePreview>
                {compact([
                  ...flatten(
                    item.authorization.map(({ actor, permission }) => (
                      <Link to={`/account/${actor}/`}>
                        {actor}: ({permission})
                      </Link>
                    )),
                  ),
                  item.handlerAccountName !== undefined && (
                    <Link to={`/account/${String(item.handlerAccountName)}/`}>
                      {this.props.t('handlerAccountName')}: {item.handlerAccountName}
                    </Link>
                  ),
                ])}
              </MessagePreview>
              <MessagePreview>{formatTimeStamp(item.createdAt, this.props.t('locale'))}</MessagePreview>
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
        <VotingProgress totalActivatedStake={this.props.totalActivatedStake} />
        <PriceChart data={this.props.priceChartData} />
        {this.getBlockList({ data: take(this.props.blockData, 6), loading: this.props.blockLoading })}
        {this.getTransactionList({
          data: take(this.props.transactionData, 6),
          loading: this.props.transactionLoading,
        })}
        {this.getAccountList({
          data: take(this.props.producerAccountList.sort((a, b) => Number(b.totalVotes) - Number(a.totalVotes)), 10),
          loading: this.props.accountLoading,
        })}
        {this.getMessageList({ data: take(this.props.messageData, 6), loading: this.props.messageLoading })}
      </Container>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, list: blockData },
  transaction: { loading: transactionLoading, list: transactionData },
  account: { loading: accountLoading, producerAccountList },
  message: { loading: messageLoading, listByTime: messageData },
  aggregation: { loading: aggregationLoading, data: aggregationData, totalActivatedStake },
  price: { loading: priceLoading, currentPriceData, priceChartData },
}): Store => ({
  blockData,
  transactionData,
  producerAccountList,
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
  totalActivatedStake,
});
const mapDispatch = ({
  block: { getBlocksList },
  transaction: { getTransactionsList },
  account: { getBPAccountsList },
  message: { getMessagesList },
  aggregation: { getAggregationData, getVoting },
  price: { getPriceData },
}): Dispatch => ({
  getBlocksList,
  getTransactionsList,
  getBPAccountsList,
  getMessagesList,
  getAggregationData,
  getPriceData,
  getVoting,
});

const frontload = (props: Dispatch & Store) =>
  Promise.all([
    props.blockData.length === 0 && props.getBlocksList(),
    props.transactionData.length === 0 && props.getTransactionsList(),
    props.getBPAccountsList(),
    props.messageData.length === 0 && props.getMessagesList(),
    props.aggregationData?.blockNumber || props.getAggregationData(),
    props.priceChartData.length === 0 && props.getPriceData(),
    props.getVoting(),
  ]);

export default translate()(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(Home),
  ),
);
