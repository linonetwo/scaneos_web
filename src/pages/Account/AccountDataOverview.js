// @flow
import { toPairs } from 'lodash';
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { translate } from 'react-i18next';

import getListValueRendering from '../../components/getListValueRendering';
import Tooltip from '../../components/Tooltip';

type Props = {
  t: Function,
  data: Object,
};

class AccountDataOverviewOriginal extends PureComponent<Props> {
  render() {
    const { t = a => a, data } = this.props;
    return (
      <Table
        scroll={{ x: 1000 }}
        size="middle"
        pagination={false}
        dataSource={toPairs(data).map(([field, value]) => ({ field, value, key: field }))}
      >
        <Table.Column
          title={t('field')}
          dataIndex="field"
          key="field"
          render={field => <Tooltip t={t} field={field} />}
        />
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
export default translate()(AccountDataOverviewOriginal);
