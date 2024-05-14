import { Button, Card, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import {
  Bank,
  Books,
  Icon,
  Money,
  PaperPlaneTilt,
  Pencil,
  Plus,
  User,
  Lock,
  Users,
  SignOut,
  Graph,
} from '@phosphor-icons/react';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import useAuth from 'hooks/use-auth';
import AccountStatistic from 'modules/accounts/components/account-statistic';
import { employees } from 'modules/user/components/user-form-type';
import UserStatistic from 'modules/user/components/user-statistic';
import UsersStatistic from 'modules/user/components/users-statistic';
import Link from 'next/link';
import React from 'react';

export type NavigationItemType = {
  link: NavigationRoutes;
  label: string;
  icon: Icon;
};

export const adminNavigationItems: NavigationItemType[] = [
  { link: NavigationRoutes.teams, label: 'Team', icon: Graph },
  { link: NavigationRoutes.users, label: 'Karyawan', icon: Users },
  {
    link: NavigationRoutes.itineraries,
    label: 'Perjalanan',
    icon: PaperPlaneTilt,
  },
  {
    link: NavigationRoutes.reimburses,
    label: 'Reimburse',
    icon: Money,
  },
  {
    link: NavigationRoutes.stationaries,
    label: 'Alat Kantor',
    icon: Pencil,
  },
  { link: NavigationRoutes.accounts, label: 'Kas', icon: Bank },
];

export const userNavigationItems: NavigationItemType[] = [
  {
    link: NavigationRoutes.createReimburse,
    label: 'Buat Reimburse',
    icon: Plus,
  },
  {
    link: NavigationRoutes.historyReimburse,
    label: 'Riwayat Reimburse',
    icon: Books,
  },
  {
    link: NavigationRoutes.itineraries,
    label: 'Perjalanan',
    icon: PaperPlaneTilt,
  },
  {
    link: NavigationRoutes.profile,
    label: 'Profil',
    icon: User,
  },
  {
    link: NavigationRoutes.changePassword,
    label: 'Ganti Password',
    icon: Lock,
  },
];

export default function Home() {
  const { user, handleUser, isAdmin, isUser } = useAuth();

  // const { replace } = useRouter();

  const onLogout = React.useCallback(() => {
    handleUser(undefined);
    // replace(NavigationRoutes.login);
  }, [handleUser]);

  const logoutItem = (
    <Card
      c="red"
      withBorder
      onClick={onLogout}
      style={{ cursor: 'pointer', borderColor: '#fa5252' }}
    >
      <Flex direction="column" justify="center" align="center">
        <SignOut size={36} />
        <Text ta="center" fw={600} mt={8}>
          Logout
        </Text>
      </Flex>
    </Card>
  );

  const adminLinks = (
    <>
      {adminNavigationItems.map((item) => {
        return (
          <Link href={item.link} passHref key={item.link}>
            <Card withBorder style={{ cursor: 'pointer' }}>
              <Flex direction="column" justify="center" align="center">
                <item.icon size={36} />
                <Text ta="center" fw={600} mt={8}>
                  {item.label}
                </Text>
              </Flex>
            </Card>
          </Link>
        );
      })}
      {logoutItem}
    </>
  );

  const userLinks = (
    <>
      {userNavigationItems.map((item) => {
        return (
          <Link href={item.link} passHref key={item.link}>
            <Card withBorder style={{ cursor: 'pointer' }}>
              <Flex direction="column" justify="center" align="center">
                <item.icon size={36} />
                <Text ta="center" fw={600} mt={8}>
                  {item.label}
                </Text>
              </Flex>
            </Card>
          </Link>
        );
      })}
      {logoutItem}
    </>
  );

  const loginUser = (
    <Button color="blue" fullWidth onClick={() => handleUser(employees[0])}>
      Login User
    </Button>
  );
  const loginAdmin = (
    <Button color="cyan" fullWidth onClick={() => handleUser(employees[1])}>
      Login Admin
    </Button>
  );

  const accountStatistics = isAdmin && (
    <>
      <Title order={6}>Statistik Kas</Title>
      <AccountStatistic />
    </>
  );

  const employeeStatistics = isAdmin && (
    <>
      <Title order={6}>Statistik Karyawan</Title>
      <UsersStatistic users={employees} />
    </>
  );

  const reimburseStatistics = (isUser || isAdmin) && (
    <>
      {isAdmin && <Title order={6}>Statistik Reimburse</Title>}
      <UserStatistic userId={isAdmin ? undefined : user?.nip} />
    </>
  );

  return (
    <>
      <Flex direction="row" gap={16} align="center">
        <User size={24} weight="bold" />
        <Title order={6}>Hello, {user?.nama ?? 'World'}</Title>
      </Flex>
      <Flex direction="column" gap={16} mt={16}>
        {accountStatistics}
        {employeeStatistics}
        {reimburseStatistics}
      </Flex>
      {isAdmin && (
        <SimpleGrid cols={2} my={24}>
          {adminLinks}
        </SimpleGrid>
      )}
      {isUser && (
        <SimpleGrid cols={2} my={24}>
          {userLinks}
        </SimpleGrid>
      )}
      {!user && (
        <Flex w="100%" my={24} gap={24}>
          {loginUser}
          {loginAdmin}
        </Flex>
      )}
    </>
  );
}
