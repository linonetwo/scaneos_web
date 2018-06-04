// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../components/Layout';
import { formatTimeStamp } from '../store/utils';
import type { TransactionData } from '../store/transaction';
import { LongListContainer } from '../components/Table';

type Props = {
  match: {
    params: {
      transactionId: string,
    },
  },
  t: Function,
};
type Store = {
  data: TransactionData,
  loading: boolean,
};
type Dispatch = {
  getTransactionData: (transactionName: string) => void,
};

class Transaction extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentTransactionName = String(this.props.match.params.transactionId);
    this.props.getTransactionData(currentTransactionName);
  }

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'Id':
        return value.$id;
      case 'messages':
        return value.map(({ $id }) => <Link to={`/message/${$id}/`}>{$id}</Link>);
      case 'createdAt':
      case 'updatedAt':
      case 'expiration':
        return formatTimeStamp(value.sec, this.props.t('locale'));
      case 'name':
        return <Link to={`/transaction/${value}/`}>{value}</Link>;
      case 'transactionId':
        return <Link to={`/transaction/${value}/`}>{value}</Link>;
      case 'blockId':
        return <Link to={`/block/${value}/`}>{value}</Link>;
      case 'refBlockNum':
        return <Link to={`/block/${value}/`}>{value}</Link>;
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
      <Fragment>
        {getBreadcrumb('transaction', this.props.t)}
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
      </Fragment>
    );
  }
}

const mapState = ({ transaction: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ transaction: { getTransactionData } }): Dispatch => ({ getTransactionData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Transaction),
  ),
);
