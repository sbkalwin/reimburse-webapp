import { Flex, Text, Title } from '@mantine/core';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';
import React from 'react';

import { EmployeeModel } from './user-form-type';
import UserRoleBadge from './user-role-badge';
import UserStatusBadge from './user-status-badge';

export default function UserItem(props: EmployeeModel) {
  const route = `${NavigationRoutes.users}/${props.nip}`;
  const label = [props.nip, props.nama].join(' - ');
  const { push, prefetch } = useRouter();

  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  return (
    <ListItem onClick={() => push(route)} pos="relative">
      <Flex align="center" gap={16}>
        <Flex direction="column">
          <Title order={6}>{label}</Title>
          <Text fz={11}>Team: {props.team_name}</Text>
          <Flex
            pos="absolute"
            direction="column"
            align="end"
            gap={4}
            top={16}
            right={16}
          >
            <UserRoleBadge role={props.peran} />
            <UserStatusBadge status={props.status} />
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}
