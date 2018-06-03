// @flow
import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { getTableHeight } from '../store/utils';

const adjustAntdTable = css`
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-table {
    width: 100%;
    padding: 0 20px;
    ${breakpoint('desktop')`
      height: ${getTableHeight()}px;
      padding: 0 40px;
    `};

  }
  .ant-table-pagination.ant-pagination {
    float: unset;
  }

  li.ant-pagination-jump-next + li.ant-pagination-item {
    display: none;
  }
`;
export const ListContainer = styled.div`
  ${adjustAntdTable};
`;
export const LongListContainer = styled.div`
  ${adjustAntdTable};
  .ant-table {
    height: unset;
    margin-bottom: 50px;
  }
`;
export const ProducerListContainer = styled.div`
  ${adjustAntdTable};
  .ant-table {
    height: unset;
    margin-bottom: 50px;
    ${breakpoint('desktop')`
      padding: 0;
      width: 90vw;
    `};
    width: 90vw;
    padding: 0;
  }
`;
