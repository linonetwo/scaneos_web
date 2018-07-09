// @flow
import React, { PureComponent, Fragment } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getBreadcrumb } from '../../components/Layout';
import { Container } from '../../components/Containers';
import { NoData } from '../../components/Table';

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
type Props = {
  match: {
    params: {
      dictionaryField: string,
    },
  },
  t: Function,
};
const GET_WIKI_DETAIL = gql`
  query GET_WIKI_DETAIL($field: String!) {
    wiki(field: $field) {
      field
      title
      titleZh
      content
      contentZh
    }
  }
`;

class Wiki extends PureComponent<Props> {
  render() {
    const { t, match } = this.props;
    const { dictionaryField } = match.params;
    return (
      <Fragment>
        {getBreadcrumb('dictionary', t, true, true)}
        <Query query={GET_WIKI_DETAIL} variables={{ field: dictionaryField }}>
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
              <Container column>
                <Title>
                  {t('locale') === 'zh' ? titleZh : title} ({field})
                </Title>
                <Article dangerouslySetInnerHTML={{ __html: t('locale') === 'zh' ? contentZh : content }} />
              </Container>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(translate('wiki')(Wiki));
