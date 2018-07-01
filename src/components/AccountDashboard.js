// @flow
import { toPairs } from 'lodash';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { Table, Progress } from 'antd';
import gql from 'graphql-tag';
import { translate } from 'react-i18next';

import getListValueRendering from './getListValueRendering';

type Props = {
  t?: Function,
  data: Object,
};

export const RESOURCE_STATUS_FRAGMENT = gql`
  fragment RESOURCE_STATUS_FRAGMENT on ResourceStatus {
    weight
    max
    available
    used
    selfDelegatedWeight
  }
`;
export const ACCOUNT_DASHBOARD_FRAGMENT = gql`
  fragment ACCOUNT_DASHBOARD_FRAGMENT on Account {
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
    refundRequest
    voterInfo {
      owner
      producers
      staked
    }
  }
  ${RESOURCE_STATUS_FRAGMENT}
`;

const DashboardContainer = styled(Flex)`
  width: 100%;
`;
const progressBackground = '#2B95D6';
const progressColor = '#0E5A8A';
const ProgressContainer = styled.div`
  width: calc((100% - 20px) / 2);
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
    span:first-child {
      color: ${progressColor};
    }
    span:nth-child(2) {
      color: ${progressBackground};
      float: right;
    }
  }
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
    return (
      <DashboardContainer wrap="true" justifyBetween>
        {/* 余额 */}
        <ProgressContainer column center>
          <h4>
            <span>
              {t('eosBalance')}: {data.eosBalance} EOS
            </span>
            <span>
              {t('eosStaked')}: {data.eosStaked} EOS
            </span>
          </h4>
          <Progress showInfo={false} percent={eosLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 内存 */}
        <ProgressContainer column center>
          <h4>
            <span>
              {t('ramAvailable')}: {data.ram.available} EOS
            </span>
            <span>
              {t('ramMax')}: {data.ram.max} EOS
            </span>
          </h4>
          <Progress showInfo={false} percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 算力 */}
        <ProgressContainer column center>
          <h4>
            <span>
              {t('cpuAvailable')}: {data.cpu.available} EOS
            </span>
            <span>
              {t('cpuMax')}: {data.cpu.max} EOS
            </span>
          </h4>
          <Progress showInfo={false} percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 带宽 */}
        <ProgressContainer column center>
          <h4>
            <span>
              {t('netAvailable')}: {data.net.available} EOS
            </span>
            <span>
              {t('netMax')}: {data.net.max} EOS
            </span>
          </h4>
          <Progress showInfo={false} percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
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
