import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

import { getItem, setItem, removeItem } from './local-storage';

const KEY_AUTH_TOKEN = 'authToken';

let client: ApolloClient<NormalizedCacheObject>;

const createAuthLink = () =>
  setContext((_, { headers }) => {
    const token = getItem(KEY_AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : '',
      },
    };
  });

const httpLink = createHttpLink({
  uri: 'http://localhost:23456/graphql',
  fetch,
  credentials: 'same-origin',
});

const regenerateClient = () => {
  client = new ApolloClient({
    link: createAuthLink().concat(httpLink),
    cache: new InMemoryCache(),
  });
};

regenerateClient();

export const getClient = () => {
  if (!client) regenerateClient();
  return client;
};

export const setAuthToken = (token: string) => {
  setItem(KEY_AUTH_TOKEN, token);
  regenerateClient();
};

export const clearAuthToken = () => {
  removeItem(KEY_AUTH_TOKEN);
  regenerateClient();
};
