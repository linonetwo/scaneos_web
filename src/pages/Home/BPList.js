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
import { Title, ListContainer, ViewAll, ActionPreview } from './styles';

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
    <ListContainer large>
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
        dataSource={take(producerAccountList, 8)}
        renderItem={(item: BPAccount) => (
          <List.Item>
            <ActionPreview>
              <Link to={`/account/${item.owner}/`}>{item.owner}</Link>
            </ActionPreview>
            <ActionPreview>
              {t('EOSVotes')}: {toUpper(numeral(item.totalVotes).format('(0,0 a)'))} Vote
            </ActionPreview>
            <ActionPreview>
              {t('homepage')}:{' '}
              <a href={item.url} target="_black" rel="noopener noreferrer">
                {item.url}
              </a>
            </ActionPreview>
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
