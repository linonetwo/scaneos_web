// @flow
import { flatten, size } from 'lodash';
import React from 'react';
import { Spin, Icon } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { format } from 'date-fns';
import is from 'styled-is';
import { getActionListValueRendering } from '../../../components/getListValueRendering';

import { Title, ListContainer, More } from '../../Home/styles';

const TradingActionsContainer = styled(ListContainer)`
  margin-top: 20px;
  min-height: 570px;
`;

const ActionContainer = styled(Flex)`
  height: 40px;
  a {
    color: #666;
  }

  margin-left: 20px;
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
const ActionType = styled(Flex)`
  font-size: 12px;
  width: 55px;
  height: 100%;
  margin-right: 10px;

  color: white;
  background-color: #fd1050;
  ${is('sell')`
    background-color: #00B3A4;
  `};
  font-family: Consolas, Monaco, monospace;
`;
const ActionContent = styled(Flex)`
  text-align: start;
  line-height: 1;
  padding: 1px 0;
  article {
    color: #333;
    min-height: 24px;
    max-height: 26px;
    overflow: hidden;
    white-space: pre-wrap;
  }
  span {
    color: #666;
  }
`;

type Props = {
  t: Function,
};
const GET_ACTIONS_DAPP_RAM = gql`
  query GET_ACTIONS_DAPP_RAM {
    actions(size: 10, filterBy: { match: "ram" }) {
      actions {
        name
        data
        id
        timestamp
        authorization {
          actor
          permission
        }
      }
    }
  }
`;
function TradingActions({ t }: Props) {
  return (
    <Query query={GET_ACTIONS_DAPP_RAM} pollInterval={10000} notifyOnNetworkStatusChange>
      {({ loading, error, data }) => {
        if (error) return <TradingActionsContainer center>{error.message}</TradingActionsContainer>;
        if (loading && size(data) === 0)
          return (
            <TradingActionsContainer center>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </TradingActionsContainer>
          );
        const {
          actions: { actions },
        } = data;
        return (
          <TradingActionsContainer column>
            <Title justifyBetween alignCenter>
              <span>{t('Actions')}</span>
              {loading && (
                <span>
                  <Spin indicator={<Icon type="loading" style={{ fontSize: 16 }} spin />} />
                  {t('Syncing')}
                </span>
              )}
              <Link to="/actions/">
                <More>{t('More')}</More>
              </Link>
            </Title>
            {actions.map(item => (
              <ActionContainer key={item.id}>
                <Link to={`/action/${item.id}/`}>
                  <ActionType column center sell={item.name === 'sellram'}>
                    <span>{format(item.timestamp, 'HH:mm')}</span>
                    <span>{t(item.name)}</span>
                  </ActionType>
                </Link>
                <ActionContent column>
                  <article>{getActionListValueRendering(item.name, item.data, t)}</article>
                  <span>
                    {flatten(
                      item.authorization.map(({ actor, permission }) => (
                        <Link key={actor + permission} to={`/account/${actor}/`}>
                          {actor} ({permission}){' '}
                        </Link>
                      )),
                    )}
                  </span>
                </ActionContent>
              </ActionContainer>
            ))}
          </TradingActionsContainer>
        );
      }}
    </Query>
  );
}

export default translate('action')(TradingActions);
