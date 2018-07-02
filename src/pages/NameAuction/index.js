// @flow
import { toPairs, omit } from 'lodash';
import React, { PureComponent, Fragment } from 'react';
import { Spin, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { getBreadcrumb } from '../../components/Layout';
import { ListContainer } from '../../components/Table';
import getListValueRendering from '../../components/getListValueRendering';

type Props = {
  t: Function,
  match: {
    params: {
      accountName: string,
    },
  },
};
const GET_NAME_AUCTION_DETAIL = gql`
  query GET_NAME_AUCTION_DETAIL($name: String!) {
    nameAuction(name: $name) {
      notInAuction
      highBidder
      highBid
      lastBidTime
      newName
    }
  }
`;
const NotInAuctionTitle = styled.h4`
  width: 100%;
  text-align: center;
`;
class NameAuction extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { accountName } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('auction', t)}
        <Query query={GET_NAME_AUCTION_DETAIL} variables={{ name: accountName }}>
          {({ loading, error, data }) => {
            if (error) return <ListContainer>{error.message}</ListContainer>;
            if (loading)
              return (
                <Spin tip={t('Connecting')} spinning={loading} size="large">
                  <ListContainer />
                </Spin>
              );
            const { nameAuction } = data;
            return (
              <ListContainer column>
                <Helmet>
                  <title>{`${nameAuction.newName} ${nameAuction.highBid}EOS ${t('Auction')} | ${t(
                    'webSiteTitle',
                  )}`}</title>
                </Helmet>
                {nameAuction.notInAuction && (
                  <NotInAuctionTitle>
                    {accountName} {t('notInAuction')}
                    {t('nearestResult')}
                  </NotInAuctionTitle>
                )}
                <Table
                  scroll={{ x: 1000 }}
                  size="middle"
                  pagination={false}
                  dataSource={toPairs(omit(nameAuction, ['notInAuction', '__typename']))
                    .map(([field, value]) => ({
                      field,
                      value,
                      key: field,
                    }))
                    .filter(({ field }) => field !== 'id')}
                >
                  <Table.Column width={200} dataIndex="field" key="field" render={t} />
                  <Table.Column
                    dataIndex="value"
                    key="value"
                    render={(value, { field }) => getListValueRendering(field, value, t)}
                  />
                </Table>
              </ListContainer>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(translate('account')(NameAuction));
