// @flow
import { sortBy } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Table } from 'antd';
import { translate } from 'react-i18next';

import Tooltip from '../../components/Tooltip';

type Props = {
  t: Function,
  permissions: Object[],
  width?: number | string,
};

const KeyContainer = styled(Flex)`
  padding: 5px;
  background-color: #50beed;
  color: white;
  width: 450px;
  border-radius: 2px;
`;

class AuthTable extends PureComponent<Props> {
  static defaultProps = {
    width: '100%',
  };

  render() {
    const { t, permissions, width } = this.props;
    return (
      <Table
        style={{ width, margin: '20px 0' }}
        scroll={{ x: 1200 }}
        size="middle"
        pagination={false}
        dataSource={permissions}
      >
        <Table.Column title={<Tooltip t={t} field="permName" />} dataIndex="permName" key="permName" />
        <Table.Column title={<Tooltip t={t} field="threshold" />} dataIndex="threshold" key="threshold" />
        <Table.Column
          title={<Tooltip t={t} field="keys" />}
          dataIndex="keys"
          key="keys"
          render={keys =>
            sortBy(keys, ['weight']).map(({ key, weight }) => (
              <KeyContainer justifyBetween>
                <span>
                  {t('weight')}:{weight}
                </span>
                <span>{key}</span>
              </KeyContainer>
            ))
          }
        />
        <Table.Column
          title={<Tooltip t={t} field="waits" />}
          dataIndex="waits"
          key="waits"
          render={waits => waits && waits.length > 0 && JSON.stringify(waits)}
        />
        <Table.Column title={<Tooltip t={t} field="parent" />} dataIndex="parent" key="parent" />
        <Table.Column
          title={<Tooltip t={t} field="subAccounts" />}
          dataIndex="accounts"
          key="accounts"
          render={accounts => accounts && accounts.length > 0 && JSON.stringify(accounts)}
        />
      </Table>
    );
  }
}

export default translate('account')(AuthTable);
