// @flow
import React from 'react';
import styled from 'styled-components';
import randomColor from 'randomcolor';
import { Link } from 'react-router-dom';

const ActionName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  padding: 5px;
  min-width: 120px;
`;

export default function(actionName: string, id: string, t: Function, options?: { noLink?: boolean }) {
  const ActionNameComponent = (
    <ActionName
      color={randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 0.7,
        hue: 'blue',
        seed: actionName,
      })}
    >
      {t(`action:${actionName}`)}
    </ActionName>
  );

  if (options?.noLink) {
    return ActionNameComponent;
  }
  return <Link to={`/action/${id}/`}>{ActionNameComponent}</Link>;
}
