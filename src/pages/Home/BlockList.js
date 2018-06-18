// @flow
import { take } from 'lodash';
import React, { PureComponent } from 'react';
import { List, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { BlockData } from '../../store/block';

import { Title, ListContainer, ViewAll, KeyInfoItemContainer, KeyInfoContainer } from './styles';

type Props = {
  t: Function,
};
type Store = {
  loading: boolean,
  list: BlockData[],
};
type Dispatch = {
  getBlocksList: (size?: number) => void,
};
class BlockList extends PureComponent<Props & Store & Dispatch> {
  componentDidMount() {
    this.polling = setInterval(() => {
      this.props.getBlocksList();
    }, 4000);
  }
  componentWillUnmount() {
    this.polling && clearInterval(this.polling);
  }
  polling = null;
  render() {
    const { loading, list, t } = this.props;
    return (
      <ListContainer>
        <Title justifyBetween alignCenter>
          <span>
            <Icon type="appstore-o" /> {t('Blocks')}
          </span>
          <Link to="/blocks/">
            <ViewAll>{t('ViewAll')}</ViewAll>
          </Link>
        </Title>
        <List
          size="small"
          loading={loading}
          itemLayout="vertical"
          dataSource={take(list, 5)}
          renderItem={(item: BlockData) => (
            <List.Item>
              <KeyInfoItemContainer>
                <Link to={`/block/${item.blockNum}/`}>
                  <KeyInfoContainer column justifyAround>
                    <span>
                      {t('blockNum')}: {item.blockNum}
                    </span>
                    {formatTimeStamp(item.timestamp, t('locale'), { distance: false })}{' '}
                  </KeyInfoContainer>
                </Link>
                <Link to={`/account/${item.producerAccountId}/`}>
                  {t('producerAccountId')}: {item.producerAccountId}
                </Link>
              </KeyInfoItemContainer>
            </List.Item>
          )}
        />
      </ListContainer>
    );
  }
}

const mapState = ({ block: { loading, list } }): Store => ({
  loading,
  list,
});
const mapDispatch = ({ block: { getBlocksList } }): Dispatch => ({
  getBlocksList,
});

const frontload = (props: Dispatch & Store) => props.list.length === 0 && props.getBlocksList();

export default translate('block')(
  connect(
    mapState,
    mapDispatch,
  )(
    frontloadConnect(frontload, {
      onUpdate: false,
      onMount: true,
    })(BlockList),
  ),
);
