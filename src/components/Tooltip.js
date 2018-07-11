// @flow
import React from 'react';
import { Spin, Tooltip as PopUp } from 'antd';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled(Flex)`
  min-width: 150px;
  height: 150px;
  padding: 10px;
`;
const Field = styled.span`
  padding: 5px 0;
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
export default function Tooltip({ t, field }: { t: Function, field: string }) {
  return (
    <PopUp
      title={
        <Query ssr={false} query={GET_DICTIONARY_ENTRY} variables={{ field }}>
          {({ loading, error, data }) => {
            if (error)
              return (
                <Container center column>
                  {error.message}
                </Container>
              );
            if (loading)
              return (
                <Container center column>
                  <Spin tip={t('Connecting')} spinning={loading} size="large" />
                </Container>
              );
            if (!data.wiki)
              return (
                <Container center column>
                  {t('noDirectionEntry')}
                </Container>
              );
            const {
              wiki: { title, titleZh, content, contentZh },
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
      }
    >
      <Field>{t(field)}</Field>
    </PopUp>
  );
}
