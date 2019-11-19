/* eslint-disable */
import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import cookie from 'cookie';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: { ROOT_URI } } = getConfig();

let apolloClient = null;

function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options,
  );
}


/**
 * Creates and configures the Apollo Client
 * @param {Object} [initialState={}]
 * @param {Object} config
 */
function create(initialState, { getToken }) {
  const errorLink = onError(({ graphQLErrors }) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') return;
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
  });

  const uploadLink = createUploadLink({
    uri: ROOT_URI || process.env.ROOT_URI,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token || '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: typeof window !== 'undefined',
    link: errorLink.concat(authLink.concat(uploadLink)),
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState),
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

export default (App) => class WithData extends React.Component {
  static async getInitialProps(ctx) {
    const {
      Component,
      router,
      ctx: {
        req,
        res,
      },
    } = ctx;
    const { token } = parseCookies(req);
    const apollo = initApolloClient({}, {
      getToken: () => token,
    });
    ctx.ctx.apolloClient = apollo;
    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(ctx);
    }
    if (res && res.finished) {
      // When redirecting, the response is finished.
      // No point in continuing to render
      return {};
    }
    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (typeof window === 'undefined') {
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            apolloClient={apollo}
            router={router}
          />,
        );
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error);
      }
      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore needs to be cleared manually
      Head.rewind();
    }
    // Extract query data form the Apollo store
    const apolloState = apollo.cache.extract();
    return {
      ...appProps,
      apolloState,
      token,
    };
  }

  constructor(props) {
    super(props);
    this.apolloClient = initApolloClient(props.apolloState, {
      getToken: () => parseCookies().token,
    });
  }

  render() {
    return <App {...this.props} apolloClient={this.apolloClient} />;
  }
};
