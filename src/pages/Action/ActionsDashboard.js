/* eslint-disable react/require-default-props */
// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { formatTimeStamp } from '../../store/utils';
import { getActionListValueRendering } from '../../components/getListValueRendering';
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
        <article>{getActionListValueRendering(name, data, t)}</article>
        <article>
          <h4>{t('createdAt')}:</h4>
          {formatTimeStamp(timestamp, t('locale'))}
        </article>
        <article>
          <h4>{t('authorization')}:</h4>
          {authorization.map(({ actor, permission }) => (
            <Link key={actor + permission} to={`/account/${actor}/`}>
              {actor} ({t('permission')}: {permission}){' '}
            </Link>
          ))}
        </article>
        <article>
          <h4>{t('transactionID')}:</h4>
          <Link to={`/transaction/${transactionID}/`}>{transactionID}</Link>
        </article>
      </Content>
    </Fragment>
  );
}
