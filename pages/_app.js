import App, { Container } from "next/app";
import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import theme, { globalStyles } from "../theme";

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
    const { Component, pageProps } = this.props;

    return (
      <>
        <Global
          styles={css`
            ${globalStyles}
          `}
        />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
