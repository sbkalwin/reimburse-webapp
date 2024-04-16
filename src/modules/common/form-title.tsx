import { Title, TitleProps } from '@mantine/core';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';
import React from 'react';

interface FormTitleProps extends TitleProps {}

export default function FormTitle(props: FormTitleProps) {
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
      default:
        return '';
    }
  }, [pathname]);

  return (
    <Title order={4} {...props}>
      {label}
    </Title>
  );
}
