// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { BlockData } from '../store/block';

const Container = styled(Flex)`
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-table {
    width: 100%;
  }
  .ant-table-pagination.ant-pagination {
    float: unset;
  }

  li.ant-pagination-jump-next + li.ant-pagination-item {
    display: none;
  }
`;

type Props = {};
type Store = {
  list: BlockData[],
  loading: boolean,
};
type Dispatch = {
  getBlocksList: () => void,
};

class Blocks extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    this.props.getBlocksList();
  }
  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <Container column>
          <Table dataSource={this.props.list}>
            <Table.Column
              title={this.props.t('blockNum')}
              dataIndex="blockNum"
              key="blockNum"
              render={blockNum => <Link to={`/block/${blockNum}`}>{blockNum}</Link>}
            />
            <Table.Column
              title={this.props.t('createdAt')}
              dataIndex="createdAt"
              key="createdAt"
              render={({ sec }) => sec}
            />
            <Table.Column
              title={this.props.t('transactions')}
              dataIndex="transactions"
              key="transactions"
              render={JSON.stringify(transactions =>
                transactions.map(({ $id }) => <Link to={`/transaction/${$id}`}>{$id}</Link>),
              )}
            />
            <Table.Column
              title={this.props.t('producerAccountId')}
              dataIndex="producerAccountId"
              key="producerAccountId"
              render={producerAccountId => <Link to={`/account/${producerAccountId}`}>{producerAccountId}</Link>}
            />
          </Table>
        </Container>
      </Spin>
    );
  }
}

const mapState = ({ block: { list }, info: { loading } }): Store => ({ list, loading });
const mapDispatch = ({ block: { getBlocksList } }): Dispatch => ({ getBlocksList });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Blocks),
  ),
);
