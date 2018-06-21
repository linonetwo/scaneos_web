// @flow
import { toPairs } from 'lodash';
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { translate } from 'react-i18next';

import type { AccountData } from '../../store/account';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
  data: AccountData,
};

class AccountDashboard extends PureComponent<Props> {
  render() {
    return (
      <Table
        scroll={{ x: 1000 }}
        size="middle"
        pagination={false}
        dataSource={[
          { field: 'tokenBalance', value: this.props.data.tokenBalance, key: 'tokenBalance' },
          ...toPairs(this.props.data).map(([field, value]) => ({ field, value, key: field })),
        ]}
      >
        <Table.Column title={this.props.t('field')} dataIndex="field" key="field" render={this.props.t} />
        <Table.Column
          title={this.props.t('value')}
          dataIndex="value"
          key="value"
          render={(value, { field }) => getListValueRendering(field, value, this.props.t)}
        />
      </Table>
    );
  }
}

export default translate('account')(AccountDashboard);
