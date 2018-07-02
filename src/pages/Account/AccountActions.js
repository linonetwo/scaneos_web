// @flow
import { truncate, flatten } from 'lodash';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import gql from 'graphql-tag';
import { translate } from 'react-i18next';
import randomColor from 'randomcolor';

import { formatTimeStamp } from '../../store/utils';
import { getActionListValueRendering } from '../../components/getListValueRendering';

const Title = styled.h3`
  text-align: center;
  font-size: 16px;
  margin: 20px 0 0;
`;
const ActionName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px;
`;

type Props = { t: Function, actions: Object[] };
export const ACTIONS_FRAGMENT = gql`
  fragment ACTIONS_FRAGMENT on Action {
    name
    data
    transactionID
    createdAt
    authorization {
      permission
      actor
    }
  }
`;

function AccountActions({ t, actions }: Props) {
  return (
    <Fragment>
      <Title>{t('Actions')}</Title>
      <Table scroll={{ x: 1200 }} size="middle" dataSource={actions} rowKey="id">
        <Table.Column
          title={t('name')}
          dataIndex="name"
          key="name"
          render={actionName => (
            <ActionName
              color={randomColor({
                luminosity: 'dark',
                format: 'rgba',
                alpha: 0.7,
                hue: 'blue',
                seed: actionName,
              })}
            >
              {t(actionName)}
            </ActionName>
          )}
        />
        <Table.Column
          title={t('data')}
          dataIndex="data"
          key="data"
          render={(data, { name }) => getActionListValueRendering(name, data, t)}
        />
        <Table.Column
          title={t('transactionID')}
          dataIndex="transactionID"
          render={transactionID => (
            <Link to={`/transaction/${transactionID}/`}>
              {truncate(transactionID, { length: 10, omission: '...' })}
            </Link>
          )}
        />
        <Table.Column
          title={t('createdAt')}
          dataIndex="createdAt"
          key="createdAt"
          render={timeStamp => formatTimeStamp(timeStamp, t('locale'))}
        />
        <Table.Column
          title={t('authorization')}
          dataIndex="authorization"
          key="authorization"
          render={authorization =>
            flatten(
              authorization.map(({ actor, permission }) => (
                <Link to={`/account/${actor}/`}>
                  {actor} ({t('permission')}: {permission})
                </Link>
              )),
            )
          }
        />
      </Table>
    </Fragment>
  );
}
export default translate('action')(AccountActions);
