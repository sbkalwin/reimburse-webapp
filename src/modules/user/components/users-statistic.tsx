import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import { CheckCircle, UsersFour, XCircle } from '@phosphor-icons/react';
import { EmployeeStatusEnum } from 'api-hooks/auth/model';
import { useGetEmployees } from 'api-hooks/employee/query';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';
import React from 'react';

export interface UsersStatisticProps {}

export default function UsersStatistic(props: UsersStatisticProps) {
  const filterByInactive = (user) =>
    user.status === EmployeeStatusEnum.inactive;
  const filterByActive = (user) => user.status === EmployeeStatusEnum.active;

  const queryGetEmployee = useGetEmployees();

  const { push } = useRouter();

  const onClickNavigation = React.useCallback(
    (status: EmployeeStatusEnum | undefined) => () => {
      push({
        pathname: NavigationRoutes.users,
        query: { status },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <LoaderView query={queryGetEmployee} isCompact>
      {(data) => {
        const all = data.length;
        const active = data.filter(filterByActive).length;
        const inactive = data.filter(filterByInactive).length;
        return (
          <>
            <SimpleGrid cols={2}>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigation(undefined)}
              >
                <Flex direction="column" justify="center" align="center">
                  <UsersFour size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Jumlah Karyawan
                  </Text>
                  <Text>{all}</Text>
                </Flex>
              </Card>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigation(EmployeeStatusEnum.active)}
              >
                <Flex direction="column" justify="center" align="center">
                  <CheckCircle size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Karyawan Active
                  </Text>
                  <Text>{active}</Text>
                </Flex>
              </Card>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigation(EmployeeStatusEnum.inactive)}
              >
                <Flex direction="column" justify="center" align="center">
                  <XCircle size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Karyawan Inactive
                  </Text>
                  <Text>{inactive}</Text>
                </Flex>
              </Card>
            </SimpleGrid>
          </>
        );
      }}
    </LoaderView>
  );
}
