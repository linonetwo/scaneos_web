// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import breakpoint from 'styled-components-breakpoint';
import { Table, Icon, Input, Spin, Modal } from 'antd';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { formatTimeStamp } from '../../store/utils';

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
};
const GET_AUCEIONS = gql`
  {
    nameAuctions(size: 21) {
      nameAuctions {
        notInAuction
        newName
        highBidder
        highBid
        lastBidTime
      }
    }
  }
`;
const SEARCH_AUCTION = gql`
  query SEARCH_AUCTION($name: String!) {
    nameAuction(name: $name) {
      notInAuction
      newName
      highBidder
      highBid
      lastBidTime
    }
  }
`;
function SearchResult({ nameAuction, t }: Object) {
  return (
    <Flex column>
      <h4><a href={`/auction/${nameAuction.newName}/`}>{nameAuction.newName}</a></h4>
      <p>{t('highBidder')}: <a href={`/account/${nameAuction.highBidder}/`}>{nameAuction.highBidder}</a></p>
      <p>{t('offerBid')}: <span>{nameAuction.highBid} EOS</span></p>
      <p>{formatTimeStamp(nameAuction.lastBidTime, t('locale'), { distance: false })}</p>
    </Flex>
  );
}

class NameAuctionList extends PureComponent<Props> {
  search = async (name, client) => {
    if (!name) return;
    const {
      data: { nameAuction },
    } = await client.query({
      query: SEARCH_AUCTION,
      variables: { name },
    });
    const { t } = this.props;
    if (nameAuction.notInAuction) {
      Modal.success({
        title: `${name} ${t('notInAuction')}${t('nearestResult')}`,
        content: <SearchResult nameAuction={nameAuction} t={t} />,
      });
    } else {
      Modal.info({
        getContainer: this.modelRef,
        title: `${nameAuction.highBidder} ${t('offerBid')} ${nameAuction.highBid} EOS`,
        content: <SearchResult nameAuction={nameAuction} t={t} />,
        onOk() {},
      });
    }
  };

  modelRef = null;

  render() {
    const { t } = this.props;
    return (
      <Query query={GET_AUCEIONS}>
        {({ loading, error, data }) => {
          if (error) return <ListContainer large>{error.message}</ListContainer>;
          if (loading)
            return (
              <Spin tip={t('Connecting')} spinning={loading} size="large">
                <ListContainer large />
              </Spin>
            );
          const {
            nameAuctions: { nameAuctions },
          } = data;
          return (
            <ListContainer large>
              <ApolloConsumer>
                {client => (
                  <Fragment>
                    <Title justifyBetween alignCenter>
                      <span>
                        <Icon type="database" /> {t('Auction')}
                      </span>
                      <SearchContainer desktop>
                        <Input.Search
                          size="small"
                          placeholder={t('tryName')}
                          onSearch={name => this.search(name, client)}
                        />
                      </SearchContainer>
                      <Link to="/auctions/">
                        <ViewAll>{t('ViewAll')}</ViewAll>
                      </Link>
                    </Title>
                    <SearchContainer>
                      <Input.Search
                        size="small"
                        placeholder={t('tryName')}
                        onSearch={name => this.search(name, client)}
                      />
                    </SearchContainer>
                  </Fragment>
                )}
              </ApolloConsumer>
              <div
                ref={elem => {
                  this.modelRef = elem;
                }}
              />
              <Table
                pagination={{
                  pageSize: 21,
                }}
                size="small"
                dataSource={nameAuctions}
                scroll={{ x: 450 }}
              >
                <Table.Column
                  title={t('newName')}
                  dataIndex="newName"
                  key="newName"
                  render={newName => <Link to={`/auction/${newName}/`}>{newName}</Link>}
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
          );
        }}
      </Query>
    );
  }
}

export default translate('account')(NameAuctionList);
