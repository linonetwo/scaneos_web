// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Spin, Table, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

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
        {/* <Table dataSource={[this.props.data]}>
          <Table.Column
            title={this.props.t('tags')}
            dataIndex="tags"
            key="tags"
            render={({ events, concepts, company, industries }) => {
              const tagList = compact(
                events
                  .concat(concepts)
                  .concat(take(company, 5))
                  .concat(flatten(industries.map(flattenCascade)).map(industryTag => last(industryTag.split('.')))),
              ).join(', ');
              return (
                <Tooltip title={tagList}>
                  <Tags>{tagList}</Tags>
                </Tooltip>
              );
            }}
          />
        </Table> */}
      </Container>
    );
  }
}

const mapState = ({ block: { data } }): Store => ({ data });
const mapDispatch = ({ block: { getBlockData } }): Dispatch => ({ getBlockData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Block),
  ),
);
