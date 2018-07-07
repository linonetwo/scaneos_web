/* eslint-env browser */
import ApolloClient from 'apollo-boost';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../generated/fragmentTypes.json';
import { GRAPHQL_API } from '../API.config';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

export default new ApolloClient({
  uri: GRAPHQL_API,
  cache: new InMemoryCache({ fragmentMatcher }).restore(window.__APOLLO_STATE__),
});
