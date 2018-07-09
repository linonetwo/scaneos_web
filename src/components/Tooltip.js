// @flow
import React, { Fragment } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { NoData } from './Table';

const Container = styled(Flex)`
  width: 300px;
  height: 150px;
  text-align: center;
  padding: 10px;

  display: none;

  &:hover,
  & .tooltip-field:hover {
    display: flex;
  }
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
    <Query ssr={false} query={GET_DICTIONARY_ENTRY} variables={{ field }}>
      {({ loading, error, data }) => {
        if (error)
          return (
            <Fragment>
              <Container>{error.message}</Container>
              <span className="tooltip-field">{t(field)}</span>
            </Fragment>
          );
        if (loading)
          return (
            <Fragment>
              <Container>
                <Spin tip={t('Connecting')} spinning={loading} size="large" />
              </Container>
              <span className="tooltip-field">{t(field)}</span>
            </Fragment>
          );
        if (!data.wiki) return <NoData>{t('noResult')}</NoData>;
        const {
          wiki: { title, titleZh, content, contentZh },
        } = data;
        return (
          <Fragment>
            <Container center column>
              <Title>
                {t('locale') === 'zh' ? titleZh : title} ({field})
              </Title>
              <Article dangerouslySetInnerHTML={{ __html: t('locale') === 'zh' ? contentZh : content }} />
            </Container>
            <span className="tooltip-field">{t(field)}</span>
          </Fragment>
        );
      }}
    </Query>
  );
}
