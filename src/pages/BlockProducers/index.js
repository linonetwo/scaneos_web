// @flow
import { toUpper, find } from 'lodash';
import numeral from 'numeral';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import { ProducerListContainer } from '../../components/Table';
import { locationBelongsToArea, reURLInformation } from '../../store/utils';
import type { BPAccount } from '../../store/account';

const Container = styled(Flex)`
  min-height: calc(100vh - 64px);
  width: 100%;
  background-color: rgb(250, 250, 250);

  .ant-table-thead > tr > th {
    line-height: 0.5;
    padding: 4px !important;
    ${breakpoint('desktop')`
      line-height: 1.5;
      padding: 8px !important;
    `};
  }
  .ant-table-row {
    line-height: 1;
    ${breakpoint('desktop')`
      line-height: 1.5;
    `};
    background-color: white;
  }
  .ant-table-row td,
  .ant-table-row td span {
    padding: 4px !important;

    white-space: nowrap;

    ${breakpoint('desktop')`
      padding: 8px !important;
    `};
  }
`;

type Props = {
  t: Function,
  location: Object,
  updateURI: (queryOverride?: Object) => void,
};
type Store = {
  producerAccountList: BPAccount[],
  producerInfoList: Object[],
  totalProducerVoteWeight: number,
  loading: boolean,
};
type Dispatch = {
  getBPAccountsList: () => void,
  getVoting: () => void,
};

class BlockProducers extends PureComponent<Props & Store, *> {
  render() {
    return (
      <Container column>
        <Spin tip="Connecting" spinning={this.props.loading} size="large">
          <ProducerListContainer>
            <Table
              size="small"
              dataSource={this.props.producerAccountList.map(({ url, ...rest }, index) => {
                const account = rest.owner;
                const details = find(this.props.producerInfoList, { account }) || {};
                return { account: rest.owner, homepage: url, ...rest, ...details, key: index + 1 };
              })}
              pagination={{
                pageSize: 512,
                current: Number(queryString.parse(this.props.location.search).page),
              }}
              scroll={{ x: 1000 }}
              onChange={pagination => {
                this.props.updateURI({ page: pagination.current });
              }}
            >
              <Table.Column width={35} dataIndex="key" key="key" />
              <Table.Column
                title={this.props.t('name')}
                dataIndex="name"
                key="name"
                render={(name, { account }) =>
                  name ? (
                    <Link to={`/producer/${account}`}>{name}</Link>
                  ) : (
                    <Link to={`/producer/${account}`}>{toUpper(account)}</Link>
                  )
                }
              />
              <Table.Column
                title={this.props.t('EOSVotes')}
                dataIndex="totalVotes"
                key="totalVotes"
                render={voteCount => (
                  <span>
                    {toUpper(numeral(voteCount).format('(0,0a)'))}
                    <strong>
                      {this.props.totalProducerVoteWeight > 0
                        ? ` (${numeral(Number(voteCount) / this.props.totalProducerVoteWeight).format('0.00%')})`
                        : ''}
                    </strong>
                  </span>
                )}
              />
              <Table.Column
                title={this.props.t('account')}
                dataIndex="account"
                key="account"
                render={account => <Link to={`/producer/${account}`}>{account}</Link>}
              />
              <Table.Column
                title={this.props.t('country')}
                dataIndex="location"
                filters={[
                  {
                    text: this.props.t('China'),
                    value: 'China',
                  },
                  {
                    text: this.props.t('Asia'),
                    value: 'Asia',
                  },
                  {
                    text: this.props.t('America'),
                    value: 'America',
                  },
                  {
                    text: this.props.t('Europe'),
                    value: 'Europe',
                  },
                  {
                    text: this.props.t('Oceania'),
                    value: 'Oceania',
                  },
                  {
                    text: this.props.t('Africa'),
                    value: 'Africa',
                  },
                ]}
                onFilter={(area, record) =>
                  (record.location && String(record.location).indexOf(area) !== -1) ||
                  locationBelongsToArea(String(record.location), area)
                }
              />
              <Table.Column title={this.props.t('homepage')} dataIndex="homepage" />
            </Table>
          </ProducerListContainer>
        </Spin>
      </Container>
    );
  }
}

const mapState = ({ account: { producerAccountList, producerInfoList, loading }, aggregation: { totalProducerVoteWeight } }): Store => ({
  loading,
  producerAccountList,
  producerInfoList,
  totalProducerVoteWeight,
});
const mapDispatch = ({
  history: { updateURI },
  account: { getBPAccountsList, getBPInfoList },
  aggregation: { getVoting },
}): Dispatch => ({
  updateURI,
  getBPAccountsList,
  getBPInfoList,
  getVoting,
});
const frontload = (props: Dispatch & Store) =>
  Promise.all([
    ...(props.producerAccountList.length === 0 ? [props.getBPAccountsList(), props.getBPInfoList()] : []),
    props.totalProducerVoteWeight === 0 && props.getVoting(),
  ]);

export default translate('bp')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(BlockProducers),
  ),
);
