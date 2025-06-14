/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DocumentNode,
  from,
  ApolloLink,
  Observable,
  OperationVariables,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
// import store from '../redux/store';
import authService from '../services/auth/AuthService';
import { Store } from 'redux';
import { ApplicationState } from '../redux/state/ApplicationState';

type Query = <QV extends OperationVariables, RT>(
  name: string,
  query: DocumentNode,
  variables?: QV,
) => Promise<RT>;
type Mutate = <MV extends OperationVariables, RT>(
  name: string,
  mutation: DocumentNode,
  variables?: MV,
) => Promise<RT>;

export type GraphQLClient = {
  query: Query;
  mutate: Mutate;
};

let store: Store<ApplicationState>;

export const injectStoreApollo = (_store: Store<ApplicationState>) => {
  store = _store;
};

const authLink = setContext(async (_, { headers }) => {
  const token = store.getState().authState.accessToken;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    console.log('** GRAPHQL ERROR **');
    const oldHeaders = operation.getContext().headers;
    if (graphQLErrors[0].message === 'Context creation failed: No token, authorization denied') {
      const token = store.getState().authState.accessToken;

      operation.setContext({
        headers: {
          ...oldHeaders,
          authorization: `Bearer ${token}`,
        },
      });
      return forward(operation);
    }
    if (graphQLErrors[0].message === 'Context creation failed: Token is not valid') {
      return new Observable((observer) => {
        const token = store.getState().authState.refreshToken;
        if (token) {
          authService
            .refreshToken({ refreshToken: token })
            .then((res) => {
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${res.data.accessToken}`,
                },
              });
            })
            .then(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              // Retry last failed request
              forward(operation).subscribe(subscriber);
            })
            .catch((error) => {
              // No refresh or client token available, we force user to login
              observer.error(error);
            });
        } else {
          console.log('No refresh token');
        }
      });
    }
  }

  if (networkError) {
    console.log('** NETWORK ERROR **');
    console.log(networkError);
  }
});

const url = false ? 'http://localhost:4000/' : 'https://forkit-server.onrender.com/';

const httpLink = new HttpLink({
  uri: `${url}graphql`,
  credentials: 'include',
});

export const createGQLClient = (): GraphQLClient => {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false,
    }),
    link: ApolloLink.from([authLink, errorLink, httpLink]),

    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  const query: Query = (name, query, variables) => {
    return client
      .query({
        query,
        variables,
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data[name]);
  };

  const mutate: Mutate = (name, mutation, variables) => {
    return client
      .mutate({
        mutation,
        variables,
      })
      .then(({ data }) => data[name]);
  };

  return { query, mutate };
};
