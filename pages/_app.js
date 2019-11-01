import App from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import theme, { globalStyles } from "../theme";
import withApolloClient from "../lib/apollo";
import withUser from "../lib/withUser";
import UserContextWrapper from "../components/userContextWrapper";


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
    const { Component, pageProps, apolloClient, user } = this.props;

    return (
      <>
        <Global
          styles={css`
            ${globalStyles}
          `}
        />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <UserContextWrapper loggedInUser={user}>
              <Component {...pageProps} />
            </UserContextWrapper>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default withApolloClient(withUser(MyApp));
