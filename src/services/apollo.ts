import { ApolloClient, InMemoryCache, ApolloLink, ApolloClientOptions, NormalizedCacheObject } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from "@apollo/client/link/error";

import { ToastAndroid } from 'react-native';

import {
  constants
} from '../config';

const httpLink =  new HttpLink({
  uri: `${constants.URL}/graphql`,
});

const webSocketLink = new WebSocketLink({
  uri: `${constants.URL}/subscriptions`,
  options: {
    reconnect: true
  }
});

const apolloClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError, forward, operation }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
    
      if (networkError) ToastAndroid.show(networkError.message, ToastAndroid.LONG);
  
      forward(operation);
    }),
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      webSocketLink,
      httpLink,
    )
  ]),
  uri: constants.URL,
  cache: new InMemoryCache()
}



const client = new ApolloClient(apolloClientOptions);

export default client;