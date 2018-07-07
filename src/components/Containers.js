import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import is, { isNot } from 'styled-is';

import { adjustAntdTable, adjustAntdTablePagination } from './Table';

export const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  padding-bottom: 50px;
  margin: auto;
  width: 90vw;
  ${breakpoint('desktop')`
    width: 1200px;
  `};
`;

export const DetailTabsContainer = styled(Container)`
  width: 100%;

  .ant-table {
    padding: 0;
  }
  .ant-tabs {
    margin: 0 5vw;
  }
  ${breakpoint('desktop')`
    .ant-tabs {
      margin: 0 calc((100vw - 1200px) / 2);
      width: 1200px;
    }
  `};

  ${adjustAntdTablePagination};
`;

export const ActionsContainer = styled(Flex)`
  width: 100%;
  padding-top: 20px;
  ${breakpoint('desktop')`
    width: 1200px;
    margin: 0 calc((100vw - 1200px) / 2);
  `};

  ${adjustAntdTablePagination};
`;

export const BPInfoContainer = styled.div`
  height: min-content;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  ${isNot('image')`
    padding: 20px;
  `};
  width: 90vw;
  margin: 15px auto 0;
  ${breakpoint('desktop')`
    width: 1200px;
    margin: 24px 0 0;

    .ant-tabs {
      width: 100%;
    }
  `};

  ${adjustAntdTablePagination};
`;

export const ProducerListContainer = styled(Flex)`
  ${adjustAntdTable};
  .ant-table,
  .ant-table-wrapper {
    height: unset;
    padding: 0;
    width: 100%;
  }

  margin: 0 auto 50px;
  min-height: calc(100vh - 64px);
  width: 90vw;
  ${breakpoint('desktop')`
    width: 1200px;
  `};
  background-color: rgb(250, 250, 250);

  .ant-table-thead > tr > th {
    line-height: 0.5;
    padding: 4px !important;
    ${breakpoint('desktop')`
      line-height: 1.5;
      padding: 8px !important;
    `};
  }
  .ant-table-row {
    line-height: 1;
    ${breakpoint('desktop')`
      line-height: 1.5;
    `};
    background-color: white;
  }
  .ant-table-row td,
  .ant-table-row td span {
    padding: 4px !important;

    white-space: nowrap;

    ${breakpoint('desktop')`
      padding: 8px !important;
    `};
  }

  & small {
    color: #999;
  }
`;

export const SearchContainer = styled.div`
  width: 200px;
  transition: width 0.3s;

  margin: auto;
  width: 90vw;
  ${breakpoint('desktop')`
    margin: 0 30px;
    max-width: 420px;
  `};
  ${is('affixed')`
    width: calc(90vw - 48px);
  `};

  .ant-input-suffix > button {
    line-height: 1 !important;
  }
  input {
    font-size: 12px;
  }
  .ant-input {
    border-bottom: 1px solid #eeeeee;
  }
`;
