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
    padding: 0 5vw;
    ${breakpoint('desktop')`
      height: ${getTableHeight()}px;
      padding: 0 calc((100vw - 1200px) / 2);
    `};

  }
  .ant-table-pagination.ant-pagination {
    float: unset;
  }
`;
export const ListContainer = styled.div`
  ${adjustAntdTable};
`;
export const LongListContainer = styled.div`
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
    width: 95vw;
    padding: 0;
    ${breakpoint('desktop')`
      width: calc(100% - 45px * 2);
    `};
  }

  & small {
    color: #999;
  }
`;

export const NoData = styled.div`
  text-align: center;
  padding: 50px;
`;
