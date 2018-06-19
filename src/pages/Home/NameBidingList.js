// @flow
import { take } from 'lodash';
import React from 'react';
import { List, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { NameBidingData } from '../../store/account';

import { Title, ListContainer, ViewAll, ActionPreview } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  list: NameBidingData[],
};
type Dispatch = {
  getNameBidingList: () => void,
};
function NameBidingList(props: Props & Store) {
  const { loading, list, t } = props;

  return (
    <ListContainer large>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="database" /> {t('Biding')}
        </span>
        <Link to="/bidings/">
          <ViewAll>{t('ViewAll')}</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={loading}
        itemLayout="vertical"
        dataSource={take(list, 8)}
        renderItem={(item: NameBidingData) => (
          <List.Item>
            <ActionPreview>
              <Link to={`/biding/${item.newName}/`}>{item.newName}</Link>
            </ActionPreview>
            <ActionPreview>
              <Link to={`/account/${item.highBidder}/`}>
                {item.highBidder} {t('offerBid')} {item.highBid}EOS
              </Link>
            </ActionPreview>
            <ActionPreview>{formatTimeStamp(item.lastBidTime, t('locale'), { distance: false })}</ActionPreview>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

const mapState = ({ account: { loading, nameBidingList: list } }): Store => ({
  loading,
  list,
});
const mapDispatch = ({ account: { getNameBidingList } }): Dispatch => ({
  getNameBidingList,
});

const frontload = (props: Dispatch & Store) => props.list.length === 0 && props.getNameBidingList();

export default translate('account')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(NameBidingList),
  ),
);
