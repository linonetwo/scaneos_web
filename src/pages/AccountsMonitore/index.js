// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { PageContainer } from '../../components/Containers';
import EosList from './EosList';
import StakedList from './StakedList';
import CpuList from './CpuList';
import RamList from './RamList';
import NetList from './NetList';

type Props = {
  t: Function,
};

class Accounts extends PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <PageContainer alignCenter justifyBetween wrap="true">
        <Helmet>
          <title>
            EOS {t('Accounts')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <EosList />
        <StakedList />
        <RamList />
        <NetList />
        <CpuList />
      </PageContainer>
    );
  }
}

export default translate('account')(Accounts);
