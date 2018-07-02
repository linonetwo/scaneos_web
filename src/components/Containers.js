import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { isNot } from 'styled-is';

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
`;

export const ActionsContainer = styled(Flex)`
  width: 100%;
  padding-top: 20px;
  ${breakpoint('desktop')`
    width: 1200px;
    margin: 0 calc((100vw - 1200px) / 2);
  `};
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
`;
