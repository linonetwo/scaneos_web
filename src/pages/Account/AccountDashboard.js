// @flow
import { toPairs } from 'lodash';
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
    span:first-child {
      color: ${({ progress }) => progress || progressColor};
    }
    span:nth-child(2) {
      color: ${({ bg }) => bg || progressBackground};
      float: right;
    }
  }
`;

export const RESOURCE_STATUS_FRAGMENT = gql`
  fragment RESOURCE_STATUS_FRAGMENT on ResourceStatus {
    weight
    max
    available
    used
    selfDelegatedWeight
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
    // data.eosStaked === netValue + cpuValue
    const totalAssets = eosTotal + ramValue;
    return (
      <DashboardContainer wrap="true" justifyBetween>
        <h3>
          {t('totalAssets')}: {numeral(totalAssets).format('0,0.0000')} EOS{' '}
          <small>
            ({t('eosTotal')}: {numeral(eosTotal).format('0,0.0000')} EOS)
          </small>
        </h3>
        {/* 余额 */}
        <ProgressContainer column center progress="#1AA2DB" bg="#08668E">
          <h4>
            <span>
              {t('eosBalance')}: {data.eosBalance} EOS
            </span>

            <span>
              {t('eosStaked')}: {data.eosStaked} EOS
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={eosLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 内存 */}
        <ProgressContainer column center progress="#1AA1DB" bg="#08668E">
          <h4>
            <span>
              {t('ramAvailable')}: {prettySize(data.ram.available, true, true, 3)}Byte
            </span>
            <span>
              {t('ramMax')}: {prettySize(data.ram.max, true, true, 3)}Byte
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 算力 */}
        <ProgressContainer column center progress="#50BEED" bg="#08668E">
          <h4>
            <span>
              {t('cpuAvailable')}: {prettySize(data.cpu.available, true, true, 3)}ms
            </span>
            <span>
              {t('cpuMax')}: {prettySize(data.cpu.max, true, true, 3)}ms
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
        </ProgressContainer>
        {/* 带宽 */}
        <ProgressContainer column center progress="#50BEED" bg="#08668E">
          <h4>
            <span>
              {t('netAvailable')}: {prettySize(data.net.available, true, true, 3)}Byte
            </span>
            <span>
              {t('netMax')}: {prettySize(data.net.max, true, true, 3)}Byte
            </span>
          </h4>
          <Progress showInfo={false} status="active" percent={ramLiquidPercent} strokeWidth={20} />
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
