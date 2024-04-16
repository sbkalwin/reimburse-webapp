import {
  ActionIcon,
  Button,
  ButtonProps,
  Card,
  CardProps,
  Flex,
} from '@mantine/core';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import React from 'react';

import NavigationRoutes from '../side-navigation/navigations';

interface AppLayoutProps {
  children?: React.ReactNode;
  backButtonProps?: ButtonProps;
  rightIconProps?: React.ComponentProps<typeof ActionIcon<'button'>>;
  back?: boolean;
  centerComponent?: React.ReactNode;
  mainContainerProps?: CardProps;
  bottomContainer?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children, backButtonProps, rightIconProps, bottomContainer } = props;
  const { back } = useRouter();

  const hasSide = !!backButtonProps || props.back || !!rightIconProps;
  const span = hasSide && <span style={{ height: 1, width: 1 }} />;

  const { pathname } = useRouter();

  const label = React.useMemo(() => {
    switch (pathname as NavigationRoutes) {
      case NavigationRoutes.changePassword:
        return 'Ganti Password';
      case NavigationRoutes.profile:
        return 'Profil';
      case NavigationRoutes.createReimburse:
        return 'Buat Reimburse';
      case NavigationRoutes.detailReimburse:
        return 'Lihat Reimburse';
      case NavigationRoutes.createStationery:
        return 'Buat Alat Tulis';
      case NavigationRoutes.detailStationery:
        return 'Lihat Alat Tulis';
      case NavigationRoutes.createUser:
        return 'Buat Karyawan';
      case NavigationRoutes.detailUser:
        return 'Lihat Karyawan';
      case NavigationRoutes.createItinerary:
        return 'Buat Perjalanan';
      case NavigationRoutes.detailItinerary:
        return 'Lihat Perjalanan';
      case NavigationRoutes.createTeam:
        return 'Buat Team';
      case NavigationRoutes.viewTeam:
        return 'Lihat Team';
      case NavigationRoutes.createAccount:
        return 'Buat Kas';
      case NavigationRoutes.detailAccount:
        return 'Lihat Kas';
      case NavigationRoutes.home:
        return 'Beranda';
      case NavigationRoutes.dashboard:
        return 'Dashboard';
      case NavigationRoutes.historyReimburse:
        return 'Riwayat Reimburse';
      case NavigationRoutes.reimburses:
        return 'Daftar Reimburse';
      case NavigationRoutes.stationaries:
        return 'Daftar Alat Tulis';
      case NavigationRoutes.users:
        return 'Daftar Karyawan';
      case NavigationRoutes.itineraries:
        return 'Daftar Perjalanan';
      case NavigationRoutes.teams:
        return 'Daftar Team';
      case NavigationRoutes.accounts:
        return 'Daftar Kas';
      default:
        return '';
    }
  }, [pathname]);
  return (
    <>
      <Card shadow="sm" withBorder>
        <Flex
          direction="row"
          w="100%"
          maw={768}
          m="auto"
          justify="space-between"
          align="center"
        >
          {!!props.back || !!backButtonProps ? (
            <Button
              variant="subtle"
              color="dark"
              justify="space-between"
              leftSection={<ArrowLeft size={24} />}
              onClick={back}
              children={label}
              {...backButtonProps}
            />
          ) : (
            span
          )}
          <Flex direction="row" flex={1} w="100%">
            {props.centerComponent}
          </Flex>
          {rightIconProps ? (
            <ActionIcon color="dark" variant="subtle" {...rightIconProps} />
          ) : (
            span
          )}
        </Flex>
      </Card>
      <Card
        h="calc(100dvh - 55px)"
        m="auto"
        style={{
          overflow: 'auto',
        }}
        padding={0}
        {...props.mainContainerProps}
      >
        <div
          style={{
            margin: '0px auto',
            width: '100%',
            maxWidth: 768,
          }}
        >
          {children}
        </div>
      </Card>
      {bottomContainer}
    </>
  );
}
