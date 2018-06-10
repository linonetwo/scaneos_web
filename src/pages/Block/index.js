// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { getBreadcrumb } from '../../components/Layout';
import { formatTimeStamp } from '../../store/utils';
import type { BlockData } from '../../store/block';
import { LongListContainer, DetailTabsContainer } from '../../components/Table';

type Props = {
  match: {
    params: {
      blockNum: string,
    },
  },
  t: Function,
};
type Store = {
  data: BlockData,
  loading: boolean,
};
type Dispatch = {
  getBlockData: (blockNumOrID: number | string) => void,
};

class Block extends Component<Props & Store & Dispatch, *> {
  state = {};
  componentDidMount() {
    const currentBlockNumberOrID = this.props.match.params.blockNum;
    this.props.getBlockData(currentBlockNumberOrID);
  }

  getValueRendering(field: string, value: any) {
    switch (field) {
      case 'id':
        return value.id;
      case 'createdAt':
      case 'updatedAt':
      case 'timestamp':
        return formatTimeStamp(value, this.props.t('locale'));
      case 'blockNum':
        return <Link to={`/block/${value}/`}>{value}</Link>;
      case 'producerAccountId':
        return <Link to={`/account/${value}/`}>{value}</Link>;
      default: {
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }
        return (
          <pre>
            <code>{JSON.stringify(value, null, '  ')}</code>
          </pre>
        );
      }
    }
  }

  render() {
    return (
      <Fragment>
        {getBreadcrumb('block', this.props.t)}
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="sync" />
                    {this.props.t('Transactions')}
                  </span>
                }
                key="1"
              />
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {this.props.t('Overview')}
                  </span>
                }
                key="2"
              >
                <LongListContainer column>
                  <Table
                    scroll={{ x: 800 }}
                    size="middle"
                    pagination={false}
                    dataSource={toPairs(this.props.data).map(([field, value]) => ({ field, value, key: field }))}
                  >
                    <Table.Column title={this.props.t('field')} dataIndex="field" key="field" render={this.props.t} />
                    <Table.Column
                      title={this.props.t('value')}
                      dataIndex="value"
                      key="value"
                      render={(value, { field }) => this.getValueRendering(field, value)}
                    />
                  </Table>
                </LongListContainer>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="file-text" />
                    {this.props.t('Raw')}
                  </span>
                }
                key="3"
              >
                <pre>
                  <code>{JSON.stringify(this.props.data, null, '  ')}</code>
                </pre>
              </Tabs.TabPane>
            </Tabs>
          </DetailTabsContainer>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ block: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ block: { getBlockData } }): Dispatch => ({ getBlockData });
export default withRouter(
  translate()(
    connect(
      mapState,
      mapDispatch,
    )(Block),
  ),
);
