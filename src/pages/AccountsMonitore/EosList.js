// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';

import TopList from './TopList';

type Props = {
  t: Function,
};
const GET_EOS_LIST = gql`
  query GET_EOS_LIST {
    accounts(sortBy: "eos", page: 0, size: 10) {
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

class EosList extends PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <TopList query={GET_EOS_LIST} type='eos' title={t('EosTop.title')} />
    );
  }
}

export default translate('account')(EosList);
