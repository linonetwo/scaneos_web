/* eslint no-unused-expressions: "off" */
import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

injectGlobal`
  ${styledNormalize};

  body {
    margin: 0;
    color: #443f54;
  }
  * {
    outline: none;
    font-family: Arial, Helvetica, Helvetica Neue, "Microsoft Yahei", "PingFang SC", "华文细黑", STXihei, serif;
    -webkit-font-smoothing: antialiased;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }

  select::-ms-expand {
    display: none;
  }
  [placeholder]{
    text-overflow:ellipsis;
  }
  ::placeholder{
    text-overflow:ellipsis;
  }
  input[type=search] {
    appearance: none;
  }

  a {
    color: #667d9a;
    text-decoration: none;
  }
  
  a:hover {
    color: #435a77;
    opacity: 1;
    text-decoration: none;
    cursor: pointer;
  }

  .ant-layout {
    background-color: white;
  }
  .ant-table-tbody > tr:hover > td {
    background-color: rgba(68, 63, 84, 0.1) !important;
  }
`;
