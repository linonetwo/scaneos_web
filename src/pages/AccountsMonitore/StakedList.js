// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';

import TopList from './TopList';

type Props = {
  t: Function,
};
const GET_STAKED_LIST = gql`
  query GET_STAKED_LIST {
    accounts(sortBy: "staked", page: 0, size: 10) {
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

class StakedList extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <TopList query={GET_STAKED_LIST} type='staked' title={t('StakedTop.title')} />
    );
  }
}

export default translate('account')(StakedList);
