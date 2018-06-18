// @flow
import { take } from 'lodash';
import React from 'react';
import { List, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { CreatedAccountData } from '../../store/account';

import { Title, ListContainer, ViewAll, MessagePreview } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  list: CreatedAccountData[],
};
type Dispatch = {
  getAccountsList: () => void,
};
function AccountList(props: Props & Store) {
  const { loading, list, t } = props;

  return (
    <ListContainer small>
      <Title justifyBetween alignCenter>
        <span>
          <Icon type="database" /> {t('Accounts')}
        </span>
        <Link to="/accounts/">
          <ViewAll>{t('ViewAll')}</ViewAll>
        </Link>
      </Title>
      <List
        size="small"
        loading={loading}
        itemLayout="vertical"
        dataSource={take(list, 10)}
        renderItem={(item: CreatedAccountData) => (
          <List.Item>
            <MessagePreview>
              <Link to={`/account/${item.data.name}/`}>{item.data.name}</Link>
            </MessagePreview>
            <MessagePreview>{formatTimeStamp(item.createdAt, t('locale'), { distance: false })}</MessagePreview>
          </List.Item>
        )}
      />
    </ListContainer>
  );
}

const mapState = ({ account: { loading, list } }): Store => ({
  loading,
  list,
});
const mapDispatch = ({ account: { getAccountsList } }): Dispatch => ({
  getAccountsList,
});

const frontload = (props: Dispatch & Store) => props.list.length === 0 && props.getAccountsList();

export default translate('account')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(AccountList),
  ),
);
