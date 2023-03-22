import React from 'react';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'antd/dist/antd.css';
import GlobalStyle from '@styles/global';
import theme from '@styles/theme';
import wrapper from '@store/configureStore';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Notice Board</title>
      </Head>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
