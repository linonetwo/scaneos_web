// @flow
import { toUpper } from 'lodash';
import React from 'react';
import { Table, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import numeral from 'numeral';
import { frontloadConnect } from 'react-frontload';

import type { BPAccount } from '../../store/account';
import { Title, ListContainer, ViewAll } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  producerAccountList: BPAccount[],
  totalProducerVoteWeight: number,
};
type Dispatch = {
  getBPAccountsList: () => void,
  getVoting: () => void,
};

function BPList(props: Props & Store) {
  const { t, loading, producerAccountList, totalProducerVoteWeight } = props;
  return (
    <Spin tip="Connecting" spinning={producerAccountList.length === 0 && loading} size="large">
      <ListContainer large>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="solution" /> {t('BlockProducers')}
          </span>
          <Link to="/producers/">
            <ViewAll>{t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <Table
          pagination={{
            pageSize: 21,
          }}
          size="small"
          dataSource={producerAccountList.map(({ url, ...rest }, index) => ({ account: rest.owner, ...rest, key: index + 1 }))}
          scroll={{ x: 450 }}
        >
          <Table.Column width={5} dataIndex="key" key="key" />
          <Table.Column
            width={70}
            title={t('name')}
            dataIndex="name"
            key="name"
            render={(name, { account }) => name || toUpper(account)}
          />
          <Table.Column
            width={50}
            title={t('EOSVotes')}
            dataIndex="totalVotes"
            key="totalVotes"
            render={voteCount =>
              totalProducerVoteWeight > 0
                ? `${numeral(Number(voteCount) / totalProducerVoteWeight).format('0.00%')}`
                : ''
            }
          />
          <Table.Column
            width={70}
            title={t('account')}
            dataIndex="account"
            key="account"
            render={account => <Link to={`/account/${account}`}>{account}</Link>}
          />
        </Table>
      </ListContainer>
    </Spin>
  );
}

const mapState = ({ account: { loading, producerAccountList }, aggregation: { totalProducerVoteWeight } }): Store => ({
  producerAccountList,
  totalProducerVoteWeight,
  loading,
});
const mapDispatch = ({ account: { getBPAccountsList }, aggregation: { getVoting } }): Dispatch => ({
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
    })(BPList),
  ),
);
