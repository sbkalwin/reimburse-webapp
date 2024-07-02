import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import {
  CheckCircle,
  ClockClockwise,
  List,
  XCircle,
} from '@phosphor-icons/react';
import {
  ReimburseLiteModel,
  ReimburseStatusEnum,
} from 'api-hooks/reimburse/model';
import { useGetReimburses } from 'api-hooks/reimburse/query';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import LoaderView from 'components/loader-view';
import { ReimburseSegmentEnum } from 'modules/reimburse/list';
import { useRouter } from 'next/router';
import React from 'react';

export interface UserStatisticProps {
  userId?: string;
}

export default function UserStatistic(props: UserStatisticProps) {
  const { userId } = props;
  const queryGetReimburses = useGetReimburses();

  const filterByUser = (reimburse: ReimburseLiteModel) =>
    !userId || reimburse.nipPemohon === userId;

  // const all = _reimburses.length;

  const filterWithPending = (reimburse: ReimburseLiteModel) =>
    reimburse.status === ReimburseStatusEnum.pending;

  const filterWithFinished = (reimburse: ReimburseLiteModel) =>
    reimburse.status === ReimburseStatusEnum.finished;

  const filterWithRejected = (reimburse: ReimburseLiteModel) =>
    reimburse.status === ReimburseStatusEnum.rejected;

  const { push } = useRouter();
  const onClickNavigate = React.useCallback(
    (segment: ReimburseSegmentEnum) => () => {
      if (userId) {
        push({
          pathname: NavigationRoutes.historyReimburse,
          query: { status: segment },
        });
      } else {
        push({
          pathname: NavigationRoutes.reimburses,
          query: { status: segment },
        });
      }
    },
    [push, userId],
  );

  return (
    <LoaderView query={queryGetReimburses} isCompact>
      {(data) => {
        const all = data.filter(filterByUser).length;

        const pending = data
          .filter(filterByUser)
          .filter(filterWithPending).length;

        const finished = data
          .filter(filterByUser)
          .filter(filterWithFinished).length;

        const rejected = data
          .filter(filterByUser)
          .filter(filterWithRejected).length;
        return (
          <>
            <SimpleGrid cols={2}>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigate(ReimburseSegmentEnum.all)}
              >
                <Flex direction="column" justify="center" align="center">
                  <List size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Total Diajukan
                  </Text>
                  <Text>{all}</Text>
                </Flex>
              </Card>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigate(ReimburseSegmentEnum.pending)}
              >
                <Flex direction="column" justify="center" align="center">
                  <ClockClockwise size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Pending
                  </Text>
                  <Text>{pending}</Text>
                </Flex>
              </Card>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigate(ReimburseSegmentEnum.finished)}
              >
                <Flex direction="column" justify="center" align="center">
                  <CheckCircle size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Diterima
                  </Text>
                  <Text>{finished}</Text>
                </Flex>
              </Card>
              <Card
                withBorder
                style={{
                  cursor: 'pointer',
                }}
                onClick={onClickNavigate(ReimburseSegmentEnum.rejected)}
              >
                <Flex direction="column" justify="center" align="center">
                  <XCircle size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Ditolak
                  </Text>
                  <Text>{rejected}</Text>
                </Flex>
              </Card>
            </SimpleGrid>
          </>
        );
      }}
    </LoaderView>
  );
}
