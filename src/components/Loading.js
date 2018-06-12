// @flow
import React from 'react';
import { Spin, Icon } from 'antd';
import styled from 'styled-components';
import { translate } from 'react-i18next';

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  text-align: center;
  padding: 100px;
`;

function Loading(props: { t: Function }) {
  return (
    <Container center column>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
      <p>{props.t('LoadingModule')}</p>
    </Container>
  );
}
export default translate()(Loading);
