import Head from "next/head";
import { getDataFromTree } from "react-apollo";
import PropTypes from "prop-types";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error';
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import cookie from 'cookie';
import getConfig from "next/config";

const { publicRuntimeConfig: { ROOT_URI } } = getConfig();

let apolloClient = null

function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  );
};

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;

    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: {
          req,
          res
        }
      } = ctx;
      const token = parseCookies(req).token;
      const apollo = initApolloClient({}, {
        getToken: () => token
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
      if (typeof window === "undefined") {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              apolloClient={apollo}
              router={router}
            />
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
        token
      };
    }
    constructor(props) {
      super(props);
      this.apolloClient = initApolloClient(props.apolloState, {
        getToken: () => parseCookies().token
      });
    }
    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
// export function withApollo (PageComponent, { ssr = true} = {}) {
//   const WithApollo = ({ apolloClient, apolloState, ...pageProps}) => {
//     const client = apolloClient || initApolloClient(apolloState, { getToken });
//     return (
//       <ApolloProvider client={client}>
//         <PageComponent {...pageProps} />
//       </ApolloProvider>
//     );
//   };

//   // Set the correct displayName in development
//   if (process.env.NODE_ENV !== 'production') {
//     const displayName =
//       PageComponent.displayName || PageComponent.name || 'Component';
    
//     if (displayName === 'App') {
//       console.warn('This withApollo HOC only works with PageComponents.');
//     }

//     WithApollo.displayName = `withApollo(${displayName})`;

//     WithApollo.propTypes = {
//       //  Used for getDataFromTree rendering
//       apolloClient: PropTypes.object,
//       //  Used for client/server rendering
//       apolloState: PropTypes.object
//     };
//   }
  
//   if (ssr || PageComponent.getInitialProps) {
//     WithApollo.getInitialProps = async ctx => {
//       const { AppTree } = ctx;

//       // Initialize ApolloClient, add it to the ctx object so
//       // we can use it in `PageComponent.getInitialProp`.
//       const apolloClient = (ctx.apolloClient = initApolloClient(
//         {},
//         {
//           getToken: () => getToken(ctx.req)
//         }
//       ));

//       const pageProps = PageComponent.getInitialProps
//         ? await PageComponent.getInitialProps(ctx)
//         : {};

//       // Only on the server
//       if (typeof window === 'undefined') {
//         // When redirecting, the response is finished.
//         // No point in continuing to render
//         if (ctx.res && ctx.res.finished) {
//           return {};
//         }

//         //Only if ssr is enabled
//         if (ssr) {
//           try {
//             // Run all GraphQL queries
//             const { getDataFromTree } = await import('@apollo/react-ssr');
//             await getDataFromTree(
//               <AppTree
//                 pageProps={{
//                   ...pageProps,
//                   apolloClient
//                 }}
//               />
//             );
//           } catch (error) {
//             // Prevent Apollo Client GraphQL errors from crashing SSR.
//             // Handle them in components via the data.error prop:
//             // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
//             console.error('Error while running `getDataFromTree`', error);
//           }

//           // getDataFromTree does not call componentWillUnmount
//           // head side effect therefore need to be cleared manually
//           Head.rewind();
//         }
//       }

//       // Extract query data from the Apollo store
//       const apolloState = apolloClient.cache.extract();

//       return {
//         ...pageProps,
//         apolloState
//       };
//     }
//   }

//   return WithApollo;
// };

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient (initialState, options) {
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
};

/**
 * Creates and configures the Apollo Client
 * @param {Object} [initialState={}]
 * @param {Object} config
 */
function create (initialState, { getToken }) {

  const errorLink = onError(({ graphQLErrors }) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "production") return;
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
  });

  const httpLink = new HttpLink({
    uri: ROOT_URI || process.env.ROOT_URI, // Server URL (must be absolute)
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: typeof window !== 'undefined',
    link: errorLink.concat(authLink.concat(httpLink)),
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache().restore(initialState)
  });
};