import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: `${constants.URL}/graphql`
});

const wsLink = new WebSocketLink({
  uri: `${constants.URL}/subscriptions`,
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
import {
    constants
} from '../config';

const client = new ApolloClient({
  uri: constants.URL,
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;