/* eslint-env browser */
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { GRAPHQL_API } from '../API.config';

export default new ApolloClient({
  uri: GRAPHQL_API,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});
