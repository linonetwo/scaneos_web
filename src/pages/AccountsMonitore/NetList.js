// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';

import TopList from './TopList';

type Props = {
  t: Function,
};
const GET_NET_LIST = gql`
  query GET_NET_LIST {
    accounts(sortBy: "net", page: 0, size: 10) {
      accounts {
        accountName
        eosBalance
        eosStaked
        ram {
          max
        }
        cpu {
          weight
        }
        net {
          weight
        }
      }
      pageInfo {
        page
        totalElements
        sortBy
      }
    }
  }
`;

class NetList extends PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <TopList query={GET_NET_LIST} type='net' title={t('NetTop.title')} />
    );
  }
}

export default translate('account')(NetList);
