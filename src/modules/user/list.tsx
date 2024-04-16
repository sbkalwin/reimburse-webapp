import { Flex, Select, SimpleGrid, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import React from 'react';

import { EmployeeModel, employees } from './components/user-form-type';
import UserItem from './components/user-item';

export function UserListLayout({ children }) {
  return (
    <ListLayout createNavigation={NavigationRoutes.createUser}>
      {children}
    </ListLayout>
  );
}
export default function UserList() {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);

  const onSearch = React.useCallback(
    (user: EmployeeModel) => {
      const label = [user.nama.toLowerCase(), user.nip].join('');
      console.log(label.includes(search.toLowerCase()));
      return label.includes(search.toLowerCase());
    },
    [search],
  );

  return (
    <Flex direction="column">
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
      {employees
        .filter(onSearch)
        .filter((employee) => {
          return employee.status === status || status === null;
        })
        .filter((employee) => {
          return employee.peran === role || role === null;
        })
        .map((employee) => {
          return <UserItem key={employee.nip} {...employee} />;
        })}
    </Flex>
  );
}
