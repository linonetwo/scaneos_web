// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';

import TopList from './TopList';

type Props = {
  t: Function,
};
const GET_CPU_LIST = gql`
  query GET_CPU_LIST {
    accounts(sortBy: "cpu", page: 0, size: 10) {
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

class CpuList extends PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <TopList query={GET_CPU_LIST} type='cpu' title={t('CpuTop.title')} />
    );
  }
}

export default translate('account')(CpuList);
