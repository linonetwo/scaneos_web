// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Form, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import Flex from 'styled-flex-component';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import prettySize from 'prettysize';

import type { Store as ToolsInfo } from '../../../store/tools';
import { Title, ListContainer, More } from '../../Home/styles';
import ScatterBtn from '../../../components/Scatter';
import BuyRam from '../../Tools/ManageAccount/components/BuyRam';
import SellRam from '../../Tools/ManageAccount/components/SellRam';
import { RESOURCE_STATUS_FRAGMENT, RESOURCE_PRICE_FRAGMENT } from '../../Account/AccountDashboard';

const ToolsContainer = styled(ListContainer)`
  margin-top: 20px;
  height: 570px;

  th:first-child {
    padding-left: 23px !important;
  }
  td:first-child {
    padding-left: 30px !important;
  }
`;
const TitleButtons = styled(Flex)`
  width: 80%;
  margin: auto;
`;
const TradingFormsContainer = styled(Flex)`
  padding: 20px;
  .ant-col-offset-8 {
    margin-left: unset;
  }
  .ant-col-12 {
    width: 100%;
  }
  .ant-input-number {
    width: 100%;
  }
`;
const AccountInfoContainer = styled(Flex)`
  color: #333;
`;

type Props = {
  t: Function,
};
type Store = {
  tools: ToolsInfo,
};

export const GET_ACCOUNT_DETAIL = gql`
  query GET_ACCOUNT_DETAIL($name: String!) {
    account(name: $name) {
      accountName
      eosBalance
      net {
        ...RESOURCE_STATUS_FRAGMENT
      }
      cpu {
        ...RESOURCE_STATUS_FRAGMENT
      }
      ram {
        ...RESOURCE_STATUS_FRAGMENT
      }
    }
    resourcePrice {
      ...RESOURCE_PRICE_FRAGMENT
    }
  }
  ${RESOURCE_STATUS_FRAGMENT}
  ${RESOURCE_PRICE_FRAGMENT}
`;
class Tools extends Component<Props & Store, *> {
  state = {
    buy: true,
  };

  render() {
    const {
      t,
      tools: { eosAccount },
    } = this.props;
    const { buy } = this.state;
    const TradingForm = Form.create()(buy ? BuyRam : SellRam);
    return (
      <ToolsContainer column large>
        <Title justifyBetween alignCenter>
          <span>{t('Toolkit')}</span>
          <TitleButtons alignCenter justifyAround>
            <Button onClick={() => this.setState({ buy: true })}>{t('manageAccount.Buy')}</Button>
            <Button onClick={() => this.setState({ buy: false })}>{t('manageAccount.Sell')}</Button>
          </TitleButtons>
          <Link to="/tools/">
            <More>{t('More')}</More>
          </Link>
        </Title>
        <ScatterBtn />

        {eosAccount &&
          eosAccount.name &&
          eosAccount.name !== 'Attach an Account' && (
            <Query query={GET_ACCOUNT_DETAIL} variables={{ name: eosAccount.name }}>
              {({ loading, error, data }) => {
                if (error) return <AccountInfoContainer>{error.message}</AccountInfoContainer>;
                if (loading)
                  return (
                    <Spin tip={t('Connecting')} spinning={loading} size="large">
                      <AccountInfoContainer center>
                        <Title>{eosAccount.name}</Title>
                      </AccountInfoContainer>
                    </Spin>
                  );
                if (!data.account)
                  return (
                    <AccountInfoContainer column>
                      <Title>{eosAccount.name}</Title>
                      {t('noResult')}
                    </AccountInfoContainer>
                  );
                const {
                  account: { accountName, eosBalance, ram },
                  resourcePrice: { ramPrice },
                } = data;
                // 内存
                const ramLiquidPercent = ram.max > 0 ? (ram.available / ram.max) * 100 : 0;
                // 资产价值
                const ramValue = (ram.max * ramPrice) / 1024;
                return (
                  <AccountInfoContainer justifyAround>
                    <Flex column>
                      <span>{t('name')}:</span> <mark>{accountName}</mark>
                    </Flex>
                    <Flex column>
                      <span>{t('eosBalance')}:</span>
                      {eosBalance}EOS
                    </Flex>
                    <Flex column>
                      <span>{t('ramAvailable')}:</span> {prettySize(ram.available, true, true, 3)}({ramLiquidPercent}%)
                    </Flex>
                    <Flex column>
                      <span>{t('ramValue')}:</span>
                      {ramValue.toFixed(2)}EOS
                    </Flex>
                  </AccountInfoContainer>
                );
              }}
            </Query>
          )}

        <TradingFormsContainer center>
          <TradingForm eosAccount={eosAccount} t={t} />
        </TradingFormsContainer>
      </ToolsContainer>
    );
  }
}

const mapState = ({ tools, info: { loading } }): Store => ({
  tools,
  loading,
});
export default translate('account')(connect(mapState)(Tools));
