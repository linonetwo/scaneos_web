import ApolloClient from 'apollo-boost';
import { GRAPHQL_API } from '../API.config';

export default new ApolloClient({
  uri: GRAPHQL_API,
});
