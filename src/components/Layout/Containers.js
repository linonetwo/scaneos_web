import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';

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
      width: 100%;
    }
  `};
`;
