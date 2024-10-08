import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4001/graphql`,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        latestReviews: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: splitLink,
  cache: cache,
});

export default client;
