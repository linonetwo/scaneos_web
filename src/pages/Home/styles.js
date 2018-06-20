import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import breakpoint from 'styled-components-breakpoint';

export const Title = styled(Flex)`
  width: 100%;
  font-size: 16px;
  padding: 0;
  color: #333;

  & a {
    margin-left: auto;
  }
`;

export const ListContainer = styled.div`
  width: 90vw;
  margin: 15px auto 0;
  ${breakpoint('desktop')`
    width: calc((1200px - 24px) / 2);
    margin: 24px 0 0;
  `};
  ${is('large')`
    height: 820px;
  `};
  .ant-list {
    margin: 0;
  }
  .ant-list-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f3f3f3 !important;
  }
  .ant-list-item-content {
    margin-bottom: 0 !important;
  }
  .ant-table-pagination {
    display: none;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #f3f3f3 !important;
  }
  .ant-table-small {
    border: none;
  }

  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  padding: 20px;
  padding-bottom: 5px;
`;
export const KeyInfoItemContainer = styled(Flex)`
  flex-direction: column;
  ${breakpoint('desktop')`
    flex-direction: row;
  `};
`;
export const KeyInfoContainer = styled(Flex)`
  background-color: gray;
  width: 100%;
  ${breakpoint('desktop')`
    width: 170px;
    min-width: 170px;
    ${is('larger')`
      width: 180px;
      min-width: 180px;
    `};
  `};

  overflow: hidden;

  height: 70px;
  margin: 10px 0;
  ${breakpoint('desktop')`
    margin: 0;
    margin-right: 20px;
  `};
  padding: 20px;

  color: white;
  & a {
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }

  white-space: pre-wrap;
`;
export const ViewAll = styled(Flex)`
  border: 1px solid gray;
  padding: 5px 13px;
  font-size: 12px;

  cursor: pointer;
  color: gray;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

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
