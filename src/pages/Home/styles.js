// @flow
import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

export const Title = styled(Flex)`
  width: 100%;
  font-size: 16px;
  padding: 20px 20px 10px;
  color: #333;

  & a {
    margin-left: auto;
  }
  span {
    white-space: nowrap;
  }
`;

export const ListContainer = styled(Flex)`
  width: 90vw;
  margin: 0px auto;
  overflow-y: hidden;
  ${breakpoint('desktop')`
    width: calc((1200px - 24px) / 2);
    margin: 0;
  `};
  .ant-list {
    margin: 0;
  }
  .ant-list-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
    border-bottom: 1px solid #f3f3f3 !important;
  }
  .ant-list-item-content {
    margin-bottom: 0 !important;
  }
  .ant-table-pagination {
    display: none;
  }
  .ant-table-tbody > tr > td {
    border-bottom: none !important;
  }
  .ant-table-small {
    border: none;
    th {
      border-bottom: none !important;
      background-color: #fafafa !important;
    }
    tr:nth-child(even) {
      background-color: #fafafa;
    }
    td {
      border-bottom: none;
      padding: 6px 8px !important;
    }
  }

  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
`;
export const WideListContainer = styled(Flex)`
  width: 90vw;
  margin: 0 auto;
  padding: 5px 10px;
  ${breakpoint('desktop')`
    width: 1200px;
    margin: 0;
    padding: 10px;
  `};
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
`;

const ViewAllContainer = styled.div`
  color: #333;
  font-size: 12px;
`;
export function More({ children }: { children: string }) {
  return (
    <ViewAllContainer>
      {children}
      <Icon type="right" />
    </ViewAllContainer>
  );
}

export const ActionPreview = styled.div`
  & a + a {
    margin-left: 10px;
  }
  margin-top: 5px;
  margin-bottom: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  text-align: left;
`;
