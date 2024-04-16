import 'reflect-metadata';
import { MantineProvider } from '@mantine/core';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { AuthProvider } from 'hooks/use-auth';
import { getIsAppFirstRun } from 'modules/onboarding';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { IBM_Plex_Sans } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'react-spring-bottom-sheet/dist/style.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { theme } from 'styles/styles';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm_plex_sans',
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const { replace } = useRouter();
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const __next = document.getElementById('__next');
      if (!__next) return;
      __next.className = `${ibmPlexSans.variable}`;
    }
  }, []);

  //for onboarding
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (getIsAppFirstRun() === 'false') {
      replace(NavigationRoutes.onboarding);
    }
  }, [replace]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <MantineProvider theme={theme}>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </MantineProvider>
    </>
  );
}
