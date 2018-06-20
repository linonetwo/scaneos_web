// @flow
import { take } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import breakpoint from 'styled-components-breakpoint';
import { List, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { NameBidingData } from '../../store/account';

import { Title, ListContainer, ViewAll, ActionPreview } from './styles';

const SearchContainer = styled(Flex)`
  padding-top: 10px;
  width: 100%;
  ${breakpoint('desktop')`
    .ant-input-search {
      width: 260px;
      margin-right: 10px;
    }
  `};
`;

type Props = {
  t: Function,
  searchIfNameIsInBiding: (name: string) => void,
};
type Store = {
  loading: boolean,
  list: NameBidingData[],
  nameBidingSearchResult: NameBidingData[],
};
type Dispatch = {
  getNameBidingList: () => void,
};
class NameBidingList extends PureComponent<Props & Store, *> {
  state = {
    keyWord: '',
  };
  render() {
    const { loading, t, nameBidingSearchResult } = this.props;
    let { list } = this.props;
    if (nameBidingSearchResult.length > 0 && this.state.keyWord.length > 0) {
      list = [
        ...(nameBidingSearchResult.length > 0 &&
        this.state.keyWord.length > 0 &&
        this.state.keyWord === nameBidingSearchResult[0].newName
          ? nameBidingSearchResult
          : [t('notInBiding')]),
        ...list,
      ];
    }
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
        <SearchContainer>
          <Input.Search
            size="small"
            placeholder={t('tryName')}
            onSearch={name => {
              this.props.searchIfNameIsInBiding(name);
              this.setState({ keyWord: name });
            }}
          />
        </SearchContainer>
        <List
          size="small"
          loading={loading}
          itemLayout="vertical"
          dataSource={take(list, 8)}
          renderItem={(item: NameBidingData | string) =>
            typeof item === 'string' ? (
              <List.Item>
                <ActionPreview>{item}</ActionPreview>
                <ActionPreview>{'　'}</ActionPreview>
                <ActionPreview>{'　'}</ActionPreview>
              </List.Item>
            ) : (
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
            )
          }
        />
      </ListContainer>
    );
  }
}

const mapState = ({ account: { loading, nameBidingList: list, nameBidingSearchResult } }): Store => ({
  loading,
  list,
  nameBidingSearchResult,
});
const mapDispatch = ({ account: { getNameBidingList, searchIfNameIsInBiding } }): Dispatch => ({
  getNameBidingList,
  searchIfNameIsInBiding,
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
