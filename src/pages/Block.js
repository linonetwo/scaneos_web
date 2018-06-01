// @flow
import { toPairs } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { formatTimeStamp } from '../store/utils';
import type { BlockData } from '../store/block';
import { LongListContainer } from '../components/Table';

type Props = {
  match: {
    params: {
      blockId: string,
    },
  },
  t: Function,
};
type Store = {
  data: BlockData,
  loading: boolean,
};
type Dispatch = {
  getBlockData: (blockNum: number) => void,
};

class Block extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentBlockID = Number(this.props.match.params.blockId);
    this.props.getBlockData(currentBlockID);
  }

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'Id':
        return value.$id;
      case 'createdAt':
      case 'timestamp':
        return formatTimeStamp(value.sec, this.props.t('locale'));
      case 'blockNum':
        return <Link to={`/block/${value}`}>{value}</Link>;
      case 'producerAccountId':
        return <Link to={`/account/${value}`}>{value}</Link>;
      default: {
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }
        return (
          <pre>
            <code>{JSON.stringify(value, null, '  ')}</code>
          </pre>
        );
      }
    }
  }

  render() {
    return (
      <Spin tip="Connecting" spinning={this.props.loading} size="large">
        <LongListContainer column>
          <Table
            size="middle"
            pagination={false}
            dataSource={toPairs(this.props.data).map(([field, value]) => ({ field, value }))}
          >
            <Table.Column title={this.props.t('field')} dataIndex="field" key="field" render={this.props.t} />
            <Table.Column
              title={this.props.t('value')}
              dataIndex="value"
              key="value"
              render={(value, { field }) => this.getValueRendering(field, value)}
            />
          </Table>
        </LongListContainer>
      </Spin>
    );
  }
}

const mapState = ({ block: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ block: { getBlockData } }): Dispatch => ({ getBlockData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Block),
  ),
);
