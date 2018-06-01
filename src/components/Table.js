// @flow
import styled from 'styled-components';

import { getTableHeight } from '../store/utils';

export const ListContainer = styled.div`
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-table {
    width: 100%;
    height: ${getTableHeight()}px;
    padding: 0 40px;
  }
  .ant-table-pagination.ant-pagination {
    float: unset;
  }

  li.ant-pagination-jump-next + li.ant-pagination-item {
    display: none;
  }
`;
