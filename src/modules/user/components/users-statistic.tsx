import { Card, SimpleGrid, Text } from '@mantine/core';
import { CheckCircle, UsersFour, XCircle } from '@phosphor-icons/react';

import { EmployeeModel, EmployeeStatusEnum } from './user-form-type';

export interface UsersStatisticProps {
  users: EmployeeModel[];
}

export default function UsersStatistic(props: UsersStatisticProps) {
  const { users } = props;
  const inactive = users.filter(
    (user) => user.status === EmployeeStatusEnum.inactive,
  ).length;
  const active = users.filter(
    (user) => user.status === EmployeeStatusEnum.active,
  ).length;
  const all = users.length;

  return (
    <SimpleGrid cols={3}>
      <Card withBorder shadow="xs">
        <UsersFour size={36} />
        <Text>Jumlah Karyawan</Text>
        <Text>{all}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <CheckCircle size={36} />
        <Text>Jumlah Karyawan Active</Text>
        <Text>{active}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <XCircle size={36} />
        <Text>Jumlah Karyawan Inactive</Text>
        <Text>{inactive}</Text>
      </Card>
    </SimpleGrid>
  );
}
