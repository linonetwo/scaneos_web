// @flow
import { take } from 'lodash';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import breakpoint from 'styled-components-breakpoint';
import { Table, Icon, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { frontloadConnect } from 'react-frontload';

import { formatTimeStamp } from '../../store/utils';
import type { NameBidingData } from '../../store/account';

import { Title, ListContainer, ViewAll } from './styles';

const SearchContainer = styled(Flex)`
  width: 100%;
  margin-top: 10px;
  ${breakpoint('desktop')`
    display: none;
    margin-top: 0px;
    margin-left: 20px;
    .ant-input-search {
      width: 260px;
    }
  `};

  ${is('desktop')`
    display: none;
    ${breakpoint('desktop')`
      display: block;
    `};
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
          : [{ newName: this.state.keyWord, highBidder: t('notInBiding') }]),
        ...list,
      ];
    }
    return (
      <Spin tip="Connecting" spinning={loading} size="large">
        <ListContainer large>
          <Title justifyBetween alignCenter>
            <span>
              <Icon type="database" /> {t('Biding')}
            </span>
            <SearchContainer desktop>
              <Input.Search
                size="small"
                placeholder={t('tryName')}
                onSearch={name => {
                  this.props.searchIfNameIsInBiding(name);
                  this.setState({ keyWord: name });
                }}
              />
            </SearchContainer>
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

          <Table
            pagination={{
              pageSize: 21,
            }}
            size="small"
            dataSource={take(list, 21)}
            scroll={{ x: 450 }}
          >
            <Table.Column
              title={t('newName')}
              dataIndex="newName"
              key="newName"
              render={newName => <Link to={`/biding/${newName}/`}>{newName}</Link>}
            />
            <Table.Column
              title={t('highBidder')}
              dataIndex="highBidder"
              key="highBidder"
              render={highBidder => <Link to={`/account/${highBidder}/`}>{highBidder}</Link>}
            />
            <Table.Column
              title={t('offerBid')}
              dataIndex="highBid"
              key="highBid"
              render={highBid => <span>{highBid}EOS</span>}
            />
            <Table.Column
              title={t('lastBidTime')}
              dataIndex="lastBidTime"
              key="lastBidTime"
              render={lastBidTime => formatTimeStamp(lastBidTime, t('locale'), { distance: false })}
            />
          </Table>
        </ListContainer>
      </Spin>
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
