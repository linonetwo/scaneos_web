// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { format } from 'date-fns';

import type { BlockData } from '../store/block';
import type { TransactionData } from '../store/transaction';

const Container = styled(Flex)`
  width: 1100px;
  background-color: white;
`;
const ListContainer = styled.div`
  margin: 0;
  width: 500px;
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
            <div>
              {format(item.createdAt.sec, 'YYYY-MM-DD HH:mm:ss')}
            </div>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

type Store = {
  blockLoading: boolean,
  transactionLoading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
};
type Dispatch = {
  getBlockData: (size?: number) => void,
  getTransactionData: (size?: number) => void,
};
class OverviewList extends Component<Store & Dispatch> {
  componentDidMount() {
    this.props.getBlockData(8);
    this.props.getTransactionData(8);
  }

  render() {
    return (
      <Container alignCenter justifyAround>
        <BlockList loading={this.props.blockLoading} data={this.props.blockData} />
        <TransactionList loading={this.props.transactionLoading} data={this.props.transactionData} />
      </Container>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, data: blockData },
  transaction: { loading: transactionLoading, data: transactionData },
}): Store => ({ blockLoading, blockData, transactionLoading, transactionData });
const mapDispatch = ({ block: { getBlockData }, transaction: { getTransactionData } }): Dispatch => ({ getBlockData, getTransactionData });
export default connect(
  mapState,
  mapDispatch,
)(OverviewList);
