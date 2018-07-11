// @flow
import { toPairs, sortBy } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { Table, Progress } from 'antd';
import gql from 'graphql-tag';
import { translate } from 'react-i18next';
import numeral from 'numeral';
import prettySize from 'prettysize';

import getListValueRendering from '../../components/getListValueRendering';
import Tooltip from '../../components/Tooltip';

type Props = {
  t?: Function,
  data: Object,
};

const DashboardContainer = styled(Flex)`
  width: 100%;

  h3 {
    margin: 30px;
    text-align: center;
    width: 100%;
    color: #08668e;
  }
`;
const progressBackground = '#2B95D6';
const progressColor = '#0E5A8A';
const ProgressContainer = styled.div`
  width: 100%;
  ${breakpoint('tablet')`
    width: calc((100% - 20px) / 2);
  `};
  padding-top: 20px;

  .ant-progress-inner {
    background-color: ${({ bg }) => bg || progressBackground};
  }
  .ant-progress-bg {
    background-color: ${({ progress }) => progress || progressColor};
    opacity: 0.7;
  }
  .ant-progress-success-bg {
    background-color: ${({ success }) => success || progressBackground};
  }

  h4 {
    & > span:first-child {
      color: ${({ progress }) => progress || progressColor};
    }
    & > span:nth-child(2) {
      color: ${({ bg }) => bg || progressBackground};
      float: right;
    }
  }
`;

const AuthContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;
const KeyContainer = styled(Flex)`
  padding: 5px;
  background-color: #50beed;
  color: white;
  width: 450px;
  border-radius: 2px;
`;

export const RESOURCE_STATUS_FRAGMENT = gql`
  fragment RESOURCE_STATUS_FRAGMENT on ResourceStatus {
    weight
    max
    available
    used
    selfDelegatedWeight
    refund
  }
`;
export const RESOURCE_PRICE_FRAGMENT = gql`
  fragment RESOURCE_PRICE_FRAGMENT on ResourcePrice {
    ramPrice
    netPrice
    cpuPrice
  }
`;
export const ACCOUNT_DASHBOARD_FRAGMENT = gql`
  fragment ACCOUNT_DASHBOARD_FRAGMENT on Account {
    accountName
    tokenBalance
    createdAt
    privileged
    eosBalance
    eosStaked
    net {
      ...RESOURCE_STATUS_FRAGMENT
    }
    cpu {
      ...RESOURCE_STATUS_FRAGMENT
    }
    ram {
      ...RESOURCE_STATUS_FRAGMENT
    }
    voterInfo {
      owner
      producers
      staked
    }
  }
  ${RESOURCE_STATUS_FRAGMENT}
`;

@translate('account')
export class AccountDashboard extends PureComponent<Props> {
  static defaultProps = {
    t: (a: string) => a,
  };

  render() {
    const { t = a => a, data } = this.props;
    // 余额
    const eosTotal = data.eosStaked + data.eosBalance;
    const eosLiquidPercent = eosTotal > 0 ? (data.eosBalance / eosTotal) * 100 : 0;
    // 内存
    const ramLiquidPercent = data.ram.max > 0 ? (data.ram.available / data.ram.max) * 100 : 0;
    // 资产价值
    const ramValue = (data.ram.max * data.ramPrice) / 1024;
    // 反抵押退款
    const refund = data.net.refund + data.cpu.refund;
    // data.eosStaked === netValue + cpuValue
    const totalAssets = eosTotal + ramValue + refund;
    return (
      <DashboardContainer wrap="true" justifyBetween>
        <h3>
          {t('totalAssets')}: {numeral(totalAssets).format('0,0.0000')} EOS<br />
          <small>
            ({t('eosTotal')}: {numeral(eosTotal).format('0,0.0000')} EOS{ramValue > 0 &&
              `, ${t('ramValue')}: ${numeral(ramValue).format('0,0.0000')} EOS`}
            {refund > 0 && `, ${t('refund')}: ${numeral(refund).format('0,0.0000')} EOS`})
          </small>
        </h3>
        {/* 余额 */}
        <ProgressContainer column center progress="#1AA2DB" bg="#08668E">
          <h4>
            <span>
              <Tooltip t={t} field="eosBalance" />: {data.eosBalance} EOS
            </span>

            <span>
              <Tooltip t={t} field="eosStaked" />: {data.eosStaked} EOS
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={eosLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 内存 */}
        <ProgressContainer column center progress="#1AA1DB" bg="#08668E">
          <h4>
            <span>
            <Tooltip t={t} field="ramAvailable" />: {prettySize(data.ram.available, true, true, 3)}Byte
            </span>
            <span>
              <Tooltip t={t} field="ramMax" />: {prettySize(data.ram.max, true, true, 3)}Byte
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 计算时间 */}
        <ProgressContainer column center progress="#50BEED" bg="#08668E">
          <h4>
            <span>
              <Tooltip t={t} field="cpuAvailable" />: {prettySize(data.cpu.available, true, true, 3)}ms
            </span>
            <span>
              <Tooltip t={t} field="cpuMax" />: {prettySize(data.cpu.max, true, true, 3)}ms
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
          {data.cpu.refund > 0 && (
            <h4>
              <span />
              <span>
                <Tooltip t={t} field="cpuRefund" />: {data.cpu.refund} EOS
              </span>
            </h4>
          )}
        </ProgressContainer>
        {/* 带宽 */}
        <ProgressContainer column center progress="#50BEED" bg="#08668E">
          <h4>
            <span>
              <Tooltip t={t} field="netAvailable" />: {prettySize(data.net.available, true, true, 3)}Byte
            </span>
            <span>
              <Tooltip t={t} field="netMax" />: {prettySize(data.net.max, true, true, 3)}Byte
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
          {data.net.refund > 0 && (
            <h4>
              <span />
              <span>
                <Tooltip t={t} field="netRefund" />: {data.net.refund} EOS
              </span>
            </h4>
          )}
        </ProgressContainer>
        <AuthContainer>
          <Table
            scroll={{ x: 1200 }}
            size="middle"
            pagination={false}
            dataSource={data.permissions.map(({ requiredAuth, ...rest }) => ({ ...requiredAuth, ...rest }))}
          >
            <Table.Column title={<Tooltip t={t} field="permName" />} dataIndex="permName" key="permName" />
            <Table.Column title={<Tooltip t={t} field="parent" />} dataIndex="parent" key="parent" />
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
              title={<Tooltip t={t} field="subAccounts" />}
              dataIndex="accounts"
              key="accounts"
              render={accounts => accounts && accounts.length > 0 && JSON.stringify(accounts)}
            />
            <Table.Column
              title={<Tooltip t={t} field="waits" />}
              dataIndex="waits"
              key="waits"
              render={waits => waits && waits.length > 0 && JSON.stringify(waits)}
            />
          </Table>
        </AuthContainer>
      </DashboardContainer>
    );
  }
}

@translate('account')
export class AccountDataOverview extends PureComponent<Props> {
  static defaultProps = {
    t: (a: string) => a,
  };

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
