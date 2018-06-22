// @flow
import { toUpper, find } from 'lodash';
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
  producerInfoList: Object[],
  totalProducerVoteWeight: number,
};
type Dispatch = {
  getBPAccountsList: () => void,
  getBPInfoList: () => void,
  getVoting: () => void,
};

function BPList(props: Props & Store) {
  const { t, loading, producerAccountList, producerInfoList, totalProducerVoteWeight } = props;
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
          dataSource={producerAccountList.map(({ url, ...rest }, index) => {
            const account = rest.owner;
            const details = find(producerInfoList, { account }) || {};
            return { account: rest.owner, homepage: url, ...rest, ...details, key: index + 1 };
          })}
          scroll={{ x: 450 }}
        >
          <Table.Column width={5} title={t('rank')} dataIndex="key" key="key" />
          <Table.Column
            width={70}
            title={t('name')}
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
            render={account => <Link to={`/producer/${account}`}>{account}</Link>}
          />
        </Table>
      </ListContainer>
    </Spin>
  );
}

const mapState = ({ account: { loading, producerAccountList, producerInfoList }, aggregation: { totalProducerVoteWeight } }): Store => ({
  producerAccountList,
  producerInfoList,
  totalProducerVoteWeight,
  loading,
});
const mapDispatch = ({ account: { getBPAccountsList, getBPInfoList }, aggregation: { getVoting } }): Dispatch => ({
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
    })(BPList),
  ),
);
