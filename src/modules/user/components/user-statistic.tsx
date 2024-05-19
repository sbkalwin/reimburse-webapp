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
import LoaderView from 'components/loader-view';

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

  return (
    <LoaderView query={queryGetReimburses} isCompact>
      {(data) => {
        const all = data.filter(filterByUser).length;

        const pending = data.filter(filterWithPending).length;

        const finished = data.filter(filterWithFinished).length;

        const rejected = data.filter(filterWithRejected).length;
        return (
          <>
            <SimpleGrid cols={2}>
              <Card withBorder>
                <Flex align="start" direction="column">
                  <List size={36} />
                  <Text>Total Diajukan</Text>
                  <Text>{all}</Text>
                </Flex>
              </Card>
              <Card withBorder>
                <Flex align="start" direction="column">
                  <ClockClockwise size={36} />
                  <Text>Pending</Text>
                  <Text>{pending}</Text>
                </Flex>
              </Card>
              <Card withBorder>
                <Flex align="start" direction="column">
                  <CheckCircle size={36} />
                  <Text>Diterima</Text>
                  <Text>{finished}</Text>
                </Flex>
              </Card>
              <Card withBorder>
                <Flex align="start" direction="column">
                  <XCircle size={36} />
                  <Text>Ditolak</Text>
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
