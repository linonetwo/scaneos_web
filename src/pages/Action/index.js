// @flow
import { toPairs } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { getBreadcrumb } from '../../components/Layout';
import type { ActionData } from '../../store/action';
import { DetailTabsContainer } from '../../components/Containers';
import { LongListContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
};
type Store = {
  data: ActionData,
  loading: boolean,
};
type Dispatch = {
  getActionData: (transactionID: string) => void,
};

export const ACTIONS_FRAGMENT = gql`
  fragment ACTIONS_FRAGMENT on Action {
    name
    data
    transactionID
    createdAt
    authorization {
      permission
      actor
    }
  }
`;

class Action extends PureComponent<Props & Store, *> {
  state = {};

  render() {
    const { data, loading, t } = this.props;
    return (
      <Fragment>
        {getBreadcrumb('action', t)}
        <Spin tip="Connecting" spinning={loading} size="large">
          <DetailTabsContainer>
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="database" />
                    {t('Overview')}
                  </span>
                }
                key="2"
              >
                <LongListContainer column>
                  <Table
                    size="middle"
                    pagination={false}
                    dataSource={toPairs(data).map(([field, value]) => ({ field, value, key: field }))}
                  >
                    <Table.Column title={t('field')} dataIndex="field" key="field" render={t} />
                    <Table.Column
                      title={t('value')}
                      dataIndex="value"
                      key="value"
                      render={(value, { field }) => getListValueRendering(field, value, t)}
                    />
                  </Table>
                </LongListContainer>
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <span>
                    <Icon type="file-text" />
                    {t('Raw')}
                  </span>
                }
                key="3"
              >
                <pre>
                  <code>{JSON.stringify(data, null, '  ')}</code>
                </pre>
              </Tabs.TabPane>
            </Tabs>
          </DetailTabsContainer>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ action: { data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ action: { getActionData } }): Dispatch => ({ getActionData });

type LoaderProps = Dispatch & {
  match: {
    params: {
      transactionId: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentTransactionID = String(props.match.params.transactionId);
  return props.getActionData(currentTransactionID);
};

export default withRouter(
  translate('action')(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(Action),
    ),
  ),
);
