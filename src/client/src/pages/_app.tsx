import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';

import { getClient } from '../libs/apollo-client';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const client = getClient();

    return (
      <ApolloProvider client={client}>
        <Head>
          <title>My page</title>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}
