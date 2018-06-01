// @flow
import { toPairs } from 'lodash';
import React, { Component } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { formatTimeStamp } from '../store/utils';
import type { AccountData } from '../store/account';
import { LongListContainer } from '../components/Table';

type Props = {
  match: {
    params: {
      accountId: string,
    },
  },
  t: Function,
};
type Store = {
  data: AccountData,
  loading: boolean,
};
type Dispatch = {
  getAccountData: (accountName: string) => void,
};

class Account extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentAccountName = String(this.props.match.params.accountId);
    this.props.getAccountData(currentAccountName);
  }

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'Id':
        return value.$id;
      case 'createdAt':
      case 'updatedAt':
        return formatTimeStamp(value.sec, this.props.t('locale'));
      case 'name':
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

const mapState = ({ account: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ account: { getAccountData } }): Dispatch => ({ getAccountData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Account),
  ),
);
