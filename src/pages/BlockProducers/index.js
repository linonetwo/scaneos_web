// @flow
import { toUpper } from 'lodash';
import numeral from 'numeral';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Table } from 'antd';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { frontloadConnect } from 'react-frontload';

import blockProducersByUrl from './blockProducersList';
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
  .ant-table-row td, .ant-table-row td span {
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
  totalProducerVoteWeight: number,
};
type Dispatch = {
  getBPAccountsList: () => void,
  getVoting: () => void,
};

class BlockProducers extends PureComponent<Props & Store, *> {
  render() {
    // console.log(this.props.producerAccountList.map(({ url, ...rest }) => {
    //   const hostName = url.match(reURLInformation)?.[3];
    //   const details = hostName ? blockProducersByUrl[hostName] : {};
    //   return { account: rest.owner, homepage: url,...rest, ...details };
    // }).filter(({ name }) => !name).map(({ account, homepage }) => `账号： ${account} 网址： ${homepage}`).join('\n'))
    return (
      <Container column>
        <ProducerListContainer>
          <Table
            size="small"
            dataSource={this.props.producerAccountList.map(({ url, ...rest }, index) => {
              const hostName = url.match(reURLInformation)?.[3];
              const details = hostName ? blockProducersByUrl[hostName] : {};
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
              width={95}
              title={this.props.t('name')}
              dataIndex="name"
              key="name"
              render={(name, { account }) => name || toUpper(account)}
            />
            <Table.Column
              width={120}
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
              width={70}
              title={this.props.t('account')}
              dataIndex="account"
              key="account"
              render={account => <Link to={`/account/${account}`}>{account}</Link>}
            />
            <Table.Column
              width={100}
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
                record.location.indexOf(area) !== -1 || locationBelongsToArea(record.location, area)
              }
            />
            <Table.Column title={this.props.t('prerequisites')} dataIndex="prerequisites" />
            <Table.Column title={this.props.t('nodeLocation')} dataIndex="nodeLocation" />
            <Table.Column title={this.props.t('homepage')} dataIndex="homepage" />
          </Table>
        </ProducerListContainer>
      </Container>
    );
  }
}

const mapState = ({ account: { producerAccountList }, aggregation: { totalProducerVoteWeight } }): Store => ({
  producerAccountList,
  totalProducerVoteWeight,
});
const mapDispatch = ({
  history: { updateURI },
  account: { getBPAccountsList },
  aggregation: { getVoting },
}): Dispatch => ({
  updateURI,
  getBPAccountsList,
  getVoting,
});
const frontload = (props: Dispatch & Store) =>
  Promise.all([
    props.producerAccountList.length === 0 && props.getBPAccountsList(),
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
