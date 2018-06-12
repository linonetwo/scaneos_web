/* eslint-disable no-control-regex */
// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { Icon, Spin } from 'antd';
import Loadable from 'react-loadable';

import { Title as ATitle } from '../../pages/Home/styles';
import { isServer } from '../../store/utils';

const Container = styled(Flex)`
  height: 250px;
  padding: 20px;

  width: 90vw;
  margin: 30px auto 0;
  ${breakpoint('desktop')`
    width: 500px;
    margin: 30px 0 0;
  `};

  background-color: white;

  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, 0.05);
`;
const Title = styled(ATitle)``;

function Loading(props: { t: Function }) {
  return (
    <Fragment>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
      <p>{props.t('LoadingModule')}</p>
    </Fragment>
  );
}
const ABIQueryInputs = Loadable({
  loader: () => import('./ABIQueryInputs'),
  loading: translate(['translations', 'mappingChecking'])(Loading),
});

function MappingChecking(props: { t: Function }) {
  return (
    <Container column alignCenter justifyBetween>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="check-square-o" /> {props.t('MappingChecker')}
        </span>
      </Title>
      {isServer ? <Loading t={props.t} /> : <ABIQueryInputs />}
    </Container>
  );
}

export default translate()(MappingChecking);
