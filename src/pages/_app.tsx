import 'reflect-metadata';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'common/helpers/query-client';
import { isWindowUndefined } from 'common/helpers/string';
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
  const { replace, prefetch } = useRouter();
  React.useEffect(() => {
    if (isWindowUndefined) return;
    const __next = document.getElementById('__next');
    if (!__next) return;
    __next.className = `${ibmPlexSans.variable}`;
  }, []);

  //for onboarding
  React.useEffect(() => {
    if (isWindowUndefined) return;
    if (getIsAppFirstRun() === 'false') {
      replace(NavigationRoutes.onboarding);
    }
  }, [replace]);

  React.useEffect(() => {
    Object.keys(NavigationRoutes).map((key) => {
      prefetch(NavigationRoutes[key]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <MantineProvider theme={theme}>
        <DatesProvider
          settings={{
            timezone: 'UTC',
          }}
        >
          <Notifications position="top-center" zIndex={1000} />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {getLayout(<Component {...pageProps} />)}
            </AuthProvider>
          </QueryClientProvider>
        </DatesProvider>
      </MantineProvider>
    </>
  );
}
