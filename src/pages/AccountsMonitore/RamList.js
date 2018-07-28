// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';

import TopList from './TopList';

type Props = {
  t: Function,
};
const GET_RAM_LIST = gql`
  query GET_RAM_LIST {
    accounts(sortBy: "ram", page: 0, size: 10) {
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

class RamList extends PureComponent<Props> {  
  render() {
    const { t } = this.props;
    return (
      <TopList query={GET_RAM_LIST} type='ram' title={t('RamTop.title')} />
    );
  }
}

export default translate('account')(RamList);
