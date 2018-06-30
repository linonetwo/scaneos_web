// @flow
import React from 'react';
import { List, Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { ListContainer } from '../../components/Table';

type Props = {
  t: Function,
};
const GET_DICTIONARY_ENTRIES = gql`
  query GET_DICTIONARY_ENTRIES($page: Int) {
    articles(page: $page) {
      articles {
        title
        content
      }
    }
  }
`;
function Dictionary({ t }: Props) {
  return (
    <Query query={GET_DICTIONARY_ENTRIES}>
      {({ loading, error, data, fetchMore }) => {
        if (error) return <ListContainer>{error.message}</ListContainer>;
        if (loading)
          return (
            <Spin tip={t('Connecting')} spinning={loading} size="large">
              <ListContainer />
            </Spin>
          );
        const {
          articles: { articles },
        } = data;
        return (
          <ListContainer column>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page =>
                  fetchMore({
                    variables: {
                      page,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return fetchMoreResult;
                    },
                  }),
                pageSize: 3,
              }}
              dataSource={articles}
              renderItem={item => (
                <List.Item key={item.title}>
                  <List.Item.Meta title={<a href={item.href}>{item.title}</a>} description={item.createdAt} />
                  {item.content}
                </List.Item>
              )}
            />
          </ListContainer>
        );
      }}
    </Query>
  );
}

export default translate()(Dictionary);
