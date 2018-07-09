// @flow
import React from 'react';
import { Spin, Icon } from 'antd';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { translate } from 'react-i18next';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { NoData } from './Table';

const Container = styled(Flex)`
  width: 300px;
  height: 150px;
  text-align: center;
  padding: 10px;
`;
const Title = styled.h3`
  padding: 10px;
  font-size: 16px;
  text-align: center;
`;
const Article = styled.article`
  padding: 10px 0;
  font-size: 14px;
  color: #666;
`;

const GET_DICTIONARY_ENTRY = gql`
  query GET_DICTIONARY_ENTRY($field: String!) {
    dictionaryEntry(field: $field) {
      field
      title
      titleZh
      brief
      briefZh
    }
  }
`;
function Tooltip({ t, field: dictionaryField }: { t: Function, field: string }) {
  return (
    <Query ssr={false} query={GET_DICTIONARY_ENTRY} variables={{ field: dictionaryField }}>
      {({ loading, error, data }) => {
        if (error) return <Container>{error.message}</Container>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <Container />
            </Spin>
          );
        if (!data.wiki) return <NoData>{t('noResult')}</NoData>;
        const {
          wiki: { field, title, titleZh, content, contentZh },
        } = data;
        return (
          <Container center column>
            <Title>
              {t('locale') === 'zh' ? titleZh : title} ({field})
            </Title>
            <Article dangerouslySetInnerHTML={{ __html: t('locale') === 'zh' ? contentZh : content }} />
          </Container>
        );
      }}
    </Query>
  );
}
export default translate()(Tooltip);
