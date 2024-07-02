import { Flex, Select, SimpleGrid, Text, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { EmployeeLiteModel } from 'api-hooks/employee/model';
import { useGetEmployees } from 'api-hooks/employee/query';
import colors from 'common/styles/colors';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import LoaderView from 'components/loader-view';
import { ListLayout } from 'modules/common/layout';
import { useRouter } from 'next/router';
import React from 'react';

import UserItem from './components/user-item';

export function UserListLayout({ children }) {
  return (
    <ListLayout createNavigation={NavigationRoutes.createUser}>
      {children}
    </ListLayout>
  );
}

export default function UserList() {
  const { query, isReady } = useRouter();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);

  const onSearch = React.useCallback(
    (user: EmployeeLiteModel) => {
      const label = [user.nama, user.nip].join('').toLowerCase();
      return label.includes(search.toLowerCase());
    },
    [search],
  );
  const queryGetEmployees = useGetEmployees({
    params: { status: status || undefined, role: role || undefined },
  });
  React.useEffect(() => {
    if (!isReady) return;
    const status = query?.status as string | undefined;
    setStatus(status || null);
  }, [isReady, query?.status]);

  return (
    <Flex direction="column" mih="calc(100dvh - 70px)">
      <Flex
        direction="column"
        gap={16}
        pos="sticky"
        top={0}
        p={16}
        style={{
          zIndex: 10,
        }}
        bg="white"
      >
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Pegawai"
          rightSection={<MagnifyingGlass size={16} />}
        />
        <SimpleGrid cols={2}>
          <Select
            placeholder="Cari Status"
            data={['active', 'inactive']}
            onChange={setStatus}
            value={status}
            clearable
          />
          <Select
            placeholder="Cari Peran"
            data={['user', 'admin']}
            onChange={setRole}
            value={role}
            clearable
          />
        </SimpleGrid>
      </Flex>
      <LoaderView query={queryGetEmployees}>
        {(data) => {
          const result = data.filter(onSearch);
          return (
            <>
              {result.length === 0 && (
                <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                  No Result Found
                </Text>
              )}
              {result.map((employee) => {
                return <UserItem key={employee.nip} {...employee} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
