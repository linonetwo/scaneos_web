// @flow
import { flatten, truncate } from 'lodash';
import React from 'react';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { format } from 'date-fns';

import { Title, ListContainer, More } from './styles';

const MemoListContainer = styled(ListContainer)`
  margin-top: 20px;
  min-height: 480px;
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
  width: 40px;
  height: 100%;
  margin-right: 10px;

  color: white;
  background-color: #333;
  font-family: Consolas, Monaco, monospace;
`;
const ActionContent = styled(Flex)`
  text-align: start;
  line-height: 1;
  padding: 1px 0;
  article {
    color: #333;
    min-height: 24px;
    max-height: 24px;
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
const GET_ACTIONS_HOME_PAGE = gql`
  query GET_ACTIONS_HOME_PAGE {
    actions(size: 8) {
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
function MemoList({ t }: Props) {
  return (
    <Query query={GET_ACTIONS_HOME_PAGE}>
      {({ loading, error, data }) => {
        if (error) return <MemoListContainer center>{error.message}</MemoListContainer>;
        if (loading)
          return (
            <MemoListContainer center>
              <Spin tip={t('Connecting')} spinning={loading} size="large" />
            </MemoListContainer>
          );
        const {
          actions: { actions },
        } = data;
        return (
          <MemoListContainer column>
            <Title justifyBetween alignCenter>
              <span>{t('Actions')}</span>
              <Link to="/actions/">
                <More>{t('More')}</More>
              </Link>
            </Title>
            {actions.map(item => (
              <ActionContainer key={item.id}>
                <Link to={`/action/${item.id}/`}>
                  <ActionType column center>
                    <span>{format(item.timestamp, 'HH:mm')}</span>
                    <span>{truncate(item.name, { length: 6, omission: '...' })}</span>
                  </ActionType>
                </Link>
                <ActionContent column>
                  <article>{item?.data?.memo || item?.data?.message}</article>
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
          </MemoListContainer>
        );
      }}
    </Query>
  );
}

export default translate('block')(MemoList);
