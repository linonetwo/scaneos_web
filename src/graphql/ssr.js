import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { GRAPHQL_API } from '../API.config';

export default () =>
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: GRAPHQL_API,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
