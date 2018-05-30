// @flow
import { compact, take, flatten, last } from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spin, Table, Breadcrumb } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';

import type { BlockData } from '../store/block';
import type { TransactionData } from '../store/transaction';

const Container = styled.div`
  height: 100vh;

  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-table {
    width: 100%;
  }
`;
const OriginalPageOpener = styled.div`
  cursor: pointer;
`;
const Tags = styled.div`
  max-width: 100px;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

type Store = {
  blockLoading: boolean,
  transactionLoading: boolean,
  blockData: BlockData[],
  transactionData: TransactionData[],
};
type Dispatch = {
  getBlocksData: (size?: number) => void,
  getTransactionData: (size?: number) => void,
};

class Transaction extends PureComponent<*> {

  render() {
    return (
      <Spin tip="Connecting Database" spinning={this.props.loading} size="large">
        <Container>
          <Table
            dataSource={this.props.results}
          >
            <Table.Column
              title={this.props.t('title')}
              render={(text, item) => (
                <OriginalPageOpener onClick={() => this.openLink(item.url)}>{text}</OriginalPageOpener>
              )}
              dataIndex="title"
              key="title"
            />
            <Table.Column
              title={this.props.t('source')}
              render={(text, item) => (
                <OriginalPageOpener onClick={() => this.openLink(item.url)}>{text}</OriginalPageOpener>
              )}
              dataIndex="source"
              key="source"
            />
            <Table.Column
              title={this.props.t('tags')}
              dataIndex="tags"
              key="tags"
              render={({ events, concepts, company, industries }) => {
                const tagList = compact(
                  events
                    .concat(concepts)
                    .concat(take(company, 5))
                    .concat(flatten(industries.map(flattenCascade)).map(industryTag => last(industryTag.split('.')))),
                ).join(', ');
                return <Tooltip title={tagList}><Tags>{tagList}</Tags></Tooltip>;
              }}
            />
          </Table>
        </Container>
      </Spin>
    );
  }
}

const mapState = ({
  block: { loading: blockLoading, list: blockData },
  transaction: { loading: transactionLoading, list: transactionData },
}): Store => ({ blockLoading, blockData, transactionLoading, transactionData });
const mapDispatch = ({ block: { getBlocksData }, transaction: { getTransactionData } }): Dispatch => ({ getBlocksData, getTransactionData });
export default translate(connect(mapState, mapDispatch)(Transaction));
