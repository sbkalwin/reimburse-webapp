import { Center, Flex, Loader, Text } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import { UseQueryResult } from '@tanstack/react-query';
import { ApiError, ApiResult } from 'api-hooks/common/model';
import notification from 'common/helpers/notifications';
import colors from 'common/styles/colors';
import { useRouter } from 'next/router';
import React from 'react';

import AppLayout from './common/app-layout/app-layout';
import NavigationRoutes from './common/side-navigation/navigations';

export interface LoaderViewProps<T> {
  query: UseQueryResult<ApiResult<T>, ApiError>;
  children: (data: T) => React.ReactElement;
  isCompact?: boolean;
}

export default function LoaderView<T>(props: LoaderViewProps<T>) {
  const { query, children, isCompact = false } = props;
  const { pathname } = useRouter();

  const isEdit = React.useMemo(() => {
    switch (pathname as NavigationRoutes) {
      case NavigationRoutes.changePassword:
      case NavigationRoutes.profile:
      case NavigationRoutes.createReimburse:
      case NavigationRoutes.detailReimburse:
      case NavigationRoutes.createStationery:
      case NavigationRoutes.detailStationery:
      case NavigationRoutes.createUser:
      case NavigationRoutes.detailUser:
      case NavigationRoutes.createItinerary:
      case NavigationRoutes.detailItinerary:
      case NavigationRoutes.createTeam:
      case NavigationRoutes.viewTeam:
      case NavigationRoutes.createAccount:
      case NavigationRoutes.detailAccount:
        return true;
      default:
        return false;
    }
  }, [pathname]);

  const loadingComponent = React.useMemo(() => {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          minHeight: '100dvh',
          minWidth: '100dvw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader size={24} pos="relative" />
      </div>
    );
  }, []);

  if (query.isFetching || query.isLoading) {
    if (isCompact)
      return (
        <>
          <Center>
            <Loader size={24} />
          </Center>
        </>
      );

    if (isEdit) {
      return <AppLayout back>{loadingComponent}</AppLayout>;
    }

    return loadingComponent;
  }

  if (query.status === 'error') {
    notification.error({ message: query.error?.message });

    const errorComponent = (
      <Flex direction="column" align="center">
        <X color={colors.sentimentNegative} size={24} weight="bold" />
        <Text c={colors.sentimentNegative} maw={768} ta="center" fz={16} mt={8}>
          {query.error?.message}
        </Text>
      </Flex>
    );

    if (isCompact) {
      return errorComponent;
    }

    if (isEdit) {
      return (
        <AppLayout back>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {errorComponent}
          </div>
        </AppLayout>
      );
    } else {
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            minHeight: '100dvh',
            minWidth: '100dvw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {errorComponent}
        </div>
      );
    }
  }

  if (query.status === 'success') {
    return children(query.data.data);
  }

  return <></>;
}
