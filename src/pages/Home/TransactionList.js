// @flow
import { truncate, take } from 'lodash';
import React from 'react';
import { List, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { TransactionData } from '../../store/transaction';
import { Title, ListContainer, ViewAll, KeyInfoItemContainer, KeyInfoContainer } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  list: TransactionData[],
};
type Dispatch = {
  getTransactionsList: (size?: number) => void,
};
function TransactionList(props: Props & Store) {
  return (
    <ListContainer>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="right-square-o" /> {props.t('Transactions')}
        </span>
        <Link to="/transactions/">
          <ViewAll>{props.t('ViewAll')}</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={props.loading}
        itemLayout="vertical"
        dataSource={take(props.list, 5)}
        renderItem={(item: TransactionData) => (
          <List.Item>
            <KeyInfoItemContainer>
              <Link to={`/transaction/${item.transactionId}/`}>
                <KeyInfoContainer larger column justifyAround>
                  <span>
                    {props.t('transactionId')}: {truncate(item.transactionId, { length: 9, omission: '...' })}
                  </span>
                  <span>{formatTimeStamp(item.createdAt, props.t('locale'), { distance: false })}</span>
                </KeyInfoContainer>
              </Link>
              <div>
                <div>
                  <Link to={`/block/${item.blockId}/?tab=transactions`}>
                    {props.t('blockId')}: {truncate(item.blockId, { length: 15, omission: '...' })}
                  </Link>
                </div>
                <div>
                  {props.t('status')}: {item.status}
                </div>
                <div>
                  {props.t('pending')}: {String(item.pending)}
                </div>
              </div>
            </KeyInfoItemContainer>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

const mapState = ({
  transaction: { loading, list },
}): Store => ({
  list,
  loading,
});
const mapDispatch = ({
  transaction: { getTransactionsList },
}): Dispatch => ({
  getTransactionsList,
});

const frontload = (props: Dispatch & Store) => props.list.length === 0 && props.getTransactionsList();

export default translate('transaction')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(TransactionList),
  ),
);
