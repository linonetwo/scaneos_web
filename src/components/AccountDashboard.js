// @flow
import { toPairs, initial } from 'lodash';
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { translate } from 'react-i18next';

import type { AccountData } from '../store/account';
import getListValueRendering from './getListValueRendering';

type Props = {
  t: Function,
  data: AccountData,
};

class AccountDashboard extends PureComponent<Props> {
  render() {
    const { t, data } = this.props;
    return (
      <Table
        scroll={{ x: 1000 }}
        size="middle"
        pagination={false}
        dataSource={[
          { field: 'tokenBalance', value: data.tokenBalance, key: 'tokenBalance' },
          ...initial(toPairs(data)).map(([field, value]) => ({ field, value, key: field })),
        ]}
      >
        <Table.Column title={t('field')} dataIndex="field" key="field" render={t} />
        <Table.Column
          title={t('value')}
          dataIndex="value"
          key="value"
          render={(value, { field }) => getListValueRendering(field, value, t)}
        />
      </Table>
    );
  }
}

export default translate('account')(AccountDashboard);
