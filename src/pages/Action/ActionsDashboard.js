/* eslint-disable react/require-default-props */
// @flow
import { truncate } from 'lodash';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Select, Spin, Icon } from 'antd';

import { formatTimeStamp } from '../../store/utils';
import { Title } from '../../components/Table';
import { getActionListValueRendering } from '../../components/getListValueRendering';
import Tooltip from '../../components/Tooltip';
import renderActionName from './renderActionName';

const Content = styled.article`
  margin: 15px 0;
`;

type Props = { t: Function, action: Object };
export default function ActionsDashboard({ t, action }: Props) {
  const { name, id, data, transactionID, timestamp, authorization } = action;
  return (
    <Fragment>
      {renderActionName(name, id, t, { noLink: true })}

      <Content>
        <p>{getActionListValueRendering(name, data, t)}</p>
        <p>
          <h4>{t('createdAt')}:</h4>
          {formatTimeStamp(timestamp, t('locale'))}
        </p>
        <p>
          <h4>{t('authorization')}:</h4>
          {authorization.map(({ actor, permission }) => (
            <Link key={actor + permission} to={`/account/${actor}/`}>
              {actor} ({t('permission')}: {permission}){' '}
            </Link>
          ))}
        </p>
        <p>
          <h4>{t('transactionID')}:</h4>
          <Link to={`/transaction/${transactionID}/`}>{transactionID}</Link>
        </p>
      </Content>
    </Fragment>
  );
}
