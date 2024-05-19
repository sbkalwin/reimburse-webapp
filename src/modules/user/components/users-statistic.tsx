import { Card, SimpleGrid, Text } from '@mantine/core';
import { CheckCircle, UsersFour, XCircle } from '@phosphor-icons/react';
import { EmployeeStatusEnum } from 'api-hooks/auth/model';
import { useGetEmployees } from 'api-hooks/employee/query';
import LoaderView from 'components/loader-view';

export interface UsersStatisticProps {}

export default function UsersStatistic(props: UsersStatisticProps) {
  const filterByInactive = (user) =>
    user.status === EmployeeStatusEnum.inactive;
  const filterByActive = (user) => user.status === EmployeeStatusEnum.active;

  const queryGetEmployee = useGetEmployees();

  return (
    <LoaderView query={queryGetEmployee} isCompact>
      {(data) => {
        const all = data.length;
        const active = data.filter(filterByActive).length;
        const inactive = data.filter(filterByInactive).length;
        return (
          <>
            <SimpleGrid cols={2}>
              <Card withBorder>
                <UsersFour size={36} />
                <Text>Jumlah Karyawan</Text>
                <Text>{all}</Text>
              </Card>
              <Card withBorder>
                <CheckCircle size={36} />
                <Text>Karyawan Active</Text>
                <Text>{active}</Text>
              </Card>
              <Card withBorder>
                <XCircle size={36} />
                <Text>Karyawan Inactive</Text>
                <Text>{inactive}</Text>
              </Card>
            </SimpleGrid>
          </>
        );
      }}
    </LoaderView>
  );
}
