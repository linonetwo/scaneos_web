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

type Props = {};
type Store = {
  list: BlockData[],
};
type Dispatch = {
  getBlocksList: () => void,
};

class Blocks extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    this.props.getBlocksList();
  }
  render() {
    return (
      <Container column>
        <pre>
          <code>{JSON.stringify(this.props.list, null, '  ')}</code>
        </pre>
        {/* <Table dataSource={[this.props.list]}>
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

const mapState = ({ block: { list } }): Store => ({ list });
const mapDispatch = ({ block: { getBlocksList } }): Dispatch => ({ getBlocksList });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Blocks),
  ),
);
