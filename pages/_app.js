import React from 'react';
import { useEffect } from 'react'
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'next-auth/client';
import { APP_NAME } from '../lib/constants';
import {darkTheme, lightTheme} from '../theme/';
import useDarkMode from 'use-dark-mode';

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const { value: isDark } = useDarkMode(true);
  const themeConfig = isDark ? darkTheme : lightTheme;

  return (
    <React.Fragment>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={themeConfig}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* cssbaseline basicamente retira todos os paddings e margins que eu tenho no padrão do html, ou seja ele zera o espaços pra ter um html mais limpo */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}