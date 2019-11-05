import App from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import theme, { globalStyles } from "../theme";
import withApolloClient from "../lib/apollo";


class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    // running the route's getInitialProps method
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }

    // providing pageProps to the route
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <>
        <Global
          styles={css`
            ${globalStyles}
          `}
        />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default withApolloClient(MyApp);
