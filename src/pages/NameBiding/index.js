// @flow
import { toPairs } from 'lodash';
import React, { Component, Fragment } from 'react';
import { Spin, Table } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';
import { Helmet } from 'react-helmet';

import { getBreadcrumb } from '../../components/Layout';
import type { NameBidingData } from '../../store/account';
import { LongListContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
};
type Store = {
  data: NameBidingData,
  loading: boolean,
};
type Dispatch = {
  getNameBidingData: (accountName: string) => void,
};

class NameBiding extends Component<Props & Store, *> {
  state = {};

  render() {
    const { data, loading, t } = this.props;
    return (
      <Fragment>
        <Helmet>
          <title>
            {`${data.newName} ${data.highBid}EOS ${t('Biding')} | ${t('webSiteTitle')}`}
          </title>
        </Helmet>
        {getBreadcrumb('biding', t)}
        <Spin tip="Connecting" spinning={loading} size="large">
          <LongListContainer column>
            <Table
              scroll={{ x: 1000 }}
              size="middle"
              pagination={false}
              dataSource={toPairs(data)
                .map(([field, value]) => ({
                  field,
                  value,
                  key: field,
                }))
                .filter(({ field }) => field !== 'id')}
            >
              <Table.Column width={200} dataIndex="field" key="field" render={t} />
              <Table.Column
                dataIndex="value"
                key="value"
                render={(value, { field }) => getListValueRendering(field, value, t)}
              />
            </Table>
          </LongListContainer>
        </Spin>
      </Fragment>
    );
  }
}

const mapState = ({ account: { bidingData: data }, info: { loading } }): Store => ({ data, loading });
const mapDispatch = ({ account: { getNameBidingData } }): Dispatch => ({ getNameBidingData });

type LoaderProps = Dispatch & {
  match: {
    params: {
      accountName: string,
    },
  },
};
const frontload = async (props: LoaderProps) => {
  const currentNameBidingName = String(props.match.params.accountName);
  return props.getNameBidingData(currentNameBidingName);
};

export default withRouter(
  translate('account')(
    connect(
      mapState,
      mapDispatch,
    )(
      frontloadConnect(frontload, {
        onUpdate: false,
      })(NameBiding),
    ),
  ),
);