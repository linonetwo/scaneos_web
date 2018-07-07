// @flow
import React, { PureComponent } from 'react';
import { Input, Icon, Modal } from 'antd';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { SearchContainer } from './Containers';
import { ACCOUNT_DASHBOARD_FRAGMENT } from '../pages/Account/AccountDashboard';
import { BLOCK_DETAIL_FRAGMENT } from '../pages/Block';
import { TRANSACTION_DETAIL_FRAGMENT } from '../pages/Transaction';

type Props = {
  t: Function,
  history: Object,
  affixed?: boolean,
};

const SEARCH_BAR = gql`
  query SEARCH_BAR($keyWord: String!) {
    search(keyWord: $keyWord) {
      __typename
      ... on Account {
        ...ACCOUNT_DASHBOARD_FRAGMENT
      }
      ... on Block {
        ...BLOCK_DETAIL_FRAGMENT
      }
      ... on Transaction {
        ...TRANSACTION_DETAIL_FRAGMENT
      }
    }
  }
  ${ACCOUNT_DASHBOARD_FRAGMENT}
  ${BLOCK_DETAIL_FRAGMENT}
  ${TRANSACTION_DETAIL_FRAGMENT}
`;

class SearchBar extends PureComponent<Props, { loading: boolean }> {
  static defaultProps = {
    affixed: false,
  };

  state = {
    loading: false,
  };

  search = async (keyWord, client) => {
    if (!keyWord) return;
    this.setState({ loading: true });
    const { data } = await client.query({
      query: SEARCH_BAR,
      variables: { keyWord },
    });
    this.setState({ loading: false });
    const { t, history } = this.props;
    if (data && data.search && data.search.__typename) {
      const { __typename, accountName, blockNum, transactionID } = data.search;
      switch (__typename) {
        case 'Account':
          return history.push(`/account/${accountName}`);
        case 'Block':
          return history.push(`/block/${blockNum}`);
        case 'Transaction':
          return history.push(`/transaction/${transactionID}`);
        default:
      }
    }

    Modal.info({
      title: t('noResult'),
      onOk() {},
    });
  };

  render() {
    const { t, affixed } = this.props;
    const { loading } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <SearchContainer affixed={affixed}>
            <Input.Search
              enterButton={loading ? <Icon type="loading" /> : <Icon type="search" />}
              placeholder={t('cansearch')}
              onSearch={keyWord => this.search(keyWord, client)}
            />
          </SearchContainer>
        )}
      </ApolloConsumer>
    );
  }
}

export default translate()(withRouter(SearchBar));
