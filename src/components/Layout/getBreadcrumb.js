// @flow
import { capitalize } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';

const BreadCrumbContainer = styled.nav`
  height: 48px;
  width: 100%;
  background-color: white;

  padding: 0 5vw;
  ${breakpoint('desktop')`
    padding: 0 calc((100vw - 1200px) / 2);
  `};
  display: flex;
  align-items: center;
`;
export default function getBreadcrumb(route: string, t: Function) {
  return (
    <BreadCrumbContainer>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">{t('Home')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/${route}s/`}>{t(capitalize(`${route}s`))}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t(capitalize(route))}</Breadcrumb.Item>
      </Breadcrumb>
    </BreadCrumbContainer>
  );
}
