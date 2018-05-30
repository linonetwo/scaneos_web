// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import {} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import type { BlockData } from '../store/block';

const Container = styled(Flex)``;

type Props = {
  match: {
    params: {
      blockId: string,
    },
  },
};
type Store = {
  data: BlockData,
};
type Dispatch = {
  getBlockData: (blockNum: number) => void,
};

class Block extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentBlockID = Number(this.props.match.params.blockId);
    this.props.getBlockData(currentBlockID);
  }
  render() {
    return (
      <Container column>
        <pre>
          <code>{JSON.stringify(this.props.data, null, '  ')}</code>
        </pre>
      </Container>
    );
  }
}

const mapState = ({ block: { data } }): Store => ({ data });
const mapDispatch = ({ block: { getBlockData } }): Dispatch => ({ getBlockData });
export default withRouter(
  connect(
    mapState,
    mapDispatch,
  )(Block),
);
