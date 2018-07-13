// @flow
import { take, sum, sumBy, toUpper, sample } from 'lodash';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { translate } from 'react-i18next';
import prettySize from 'prettysize';
import it from 'param.macro';
import numeral from 'numeral';
import { Helmet } from 'react-helmet';

import { Container } from '../../../components/Containers';

const GET_ACCOUNT_TREND = gql`
  query GET_ACCOUNT_TREND {
    accountTrend(fields: "ram", range: 0) {
      timestamp
      ramPosition
      ramTopAccountsDetail {
        eosBalance
        accountName
      }
    }
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;
const Time = styled.time`
  text-align: center;
  margin: 5px 0 15px;
`;
const Content = styled.article`
  line-height: 2;
  p {
    line-height: 1.5;
  }
  font-size: 14px;
  color: #333;
`;

function RamReport({ t }: { t: Function }) {
  return (
    <Container column alignCenter>
      <Helmet>
        <title>
          EOS {t('block:ram')} {t('Report')} | {t('webSiteTitle')}
        </title>
      </Helmet>
      <Query query={GET_ACCOUNT_TREND}>
        {({ loading, error, data }) => {
          if (error) return error.message;
          if (loading) return <Spin tip={t('Connecting')} spinning={loading} size="large" />;
          const { accountTrend } = data;
          if (!accountTrend || !accountTrend.length || accountTrend.length <= 0) return t('noResult');

          const [latestPositionData] = accountTrend;
          const Ram前 = (range: number) => {
            const 持仓量 = prettySize(sum(take(latestPositionData.ramPosition, range)));
            const 流动EOS余额 = ` ${toUpper(
              numeral(sumBy(take(latestPositionData.ramTopAccountsDetail, range), it.eosBalance)).format('(0,0.000 a)'),
            )} `;
            const 他们 = () => sample(['他们', '这组用户']);
            const 仅仅 = () => sample(['只', '']);
            const 要达到盈亏平衡 = () => sample(['要达到盈亏平衡', '如果想盈利', '为达到盈利']);
            return (
              <Fragment>
                <h4>Ram前{range}名大户</h4>
                <p>
                  持仓共{持仓量}，可用流动EOS余额共计{流动EOS余额}EOS。
                </p>
                <p>
                  前{range}名大户的平均历史成本为 EOS/kB，{要达到盈亏平衡()}，{他们()}
                  {仅仅()}需要内存价格达到 EOS/kB。
                </p>
              </Fragment>
            );
          };
          return (
            <Fragment>
              <Title>Ram持仓统计</Title>
              <Time>{latestPositionData.timestamp.split('T')[0]}</Time>
              <Content>
                {Ram前(10)}
                {Ram前(20)}
                {Ram前(60)}
                {Ram前(100)}
              </Content>
            </Fragment>
          );
        }}
      </Query>
    </Container>
  );
}

export default translate()(RamReport);
