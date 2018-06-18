// @flow
import { toUpper, take } from 'lodash';
import React from 'react';
import { List, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import numeral from 'numeral';
import { frontloadConnect } from 'react-frontload';

import type { BPAccount } from '../../store/account';
import { Title, ListContainer, ViewAll, MessagePreview } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  producerAccountList: BPAccount[],
};
type Dispatch = {
  getBPAccountsList: () => void,
};

function BPList(props: Props & Store) {
  const { t, loading, producerAccountList } = props;
  return (
    <ListContainer small>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="solution" /> {t('BlockProducers')}
        </span>
        <Link to="/producers/">
          <ViewAll>{t('ViewAll')}</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={loading}
        itemLayout="vertical"
        dataSource={take(producerAccountList, 7)}
        renderItem={(item: BPAccount) => (
          <List.Item>
            <MessagePreview>
              <Link to={`/account/${item.owner}/`}>{item.owner}</Link>
            </MessagePreview>
            <MessagePreview>
              {t('EOSVotes')}: {toUpper(numeral(item.totalVotes).format('(0,0 a)'))} Vote
            </MessagePreview>
            <MessagePreview>
              {t('homepage')}:{' '}
              <a href={item.url} target="_black" rel="noopener noreferrer">
                {item.url}
              </a>
            </MessagePreview>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

const mapState = ({ account: { loading, producerAccountList } }): Store => ({
  producerAccountList,
  loading,
});
const mapDispatch = ({ account: { getBPAccountsList } }): Dispatch => ({
  getBPAccountsList,
});

const frontload = (props: Dispatch & Store) => props.producerAccountList.length === 0 && props.getBPAccountsList();

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
