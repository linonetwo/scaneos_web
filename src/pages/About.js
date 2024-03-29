// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  overflow-x: hidden;
  color: #333;
`;
const Content = styled(Flex)`
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.02);
  width: 90vw;
`;
const ContentTitle = styled.h2`
  text-align: center;
`;

class About extends PureComponent<{ t: Function }> {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Helmet>
          <title>
            ScanEOS {t('About')} | {t('webSiteTitle')}
          </title>
        </Helmet>
        <Content column>
          <ContentTitle>{t('thisSite')}</ContentTitle>
          <Trans i18nKey="aboutThisSite">
            <p>what</p>
            <p>why</p>
            <p>how</p>
          </Trans>
        </Content>
        <Content column>
          <ContentTitle>{t('EOS')}</ContentTitle>
          <Trans i18nKey="aboutEOS">
            <p>what</p>
            <p>why</p>
          </Trans>
        </Content>
      </Container>
    );
  }
}
export default translate()(About);
