import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import {
  CheckCircle,
  ClockClockwise,
  List,
  XCircle,
} from '@phosphor-icons/react';
import {
  ReimburseStatusEnum,
  reimburses,
} from 'modules/reimburse/components/reimburse-form-type';

export interface UserStatisticProps {
  userId?: string;
}

export default function UserStatistic(props: UserStatisticProps) {
  const { userId } = props;
  const _reimburses = reimburses.filter(
    (reimburse) => !userId || reimburse.nip_pemohon === userId,
  );

  const all = _reimburses.length;

  const pending = _reimburses.filter(
    (reimburse) => reimburse.status === ReimburseStatusEnum.pending,
  ).length;

  const finished = _reimburses.filter(
    (reimburse) => reimburse.status === ReimburseStatusEnum.finished,
  ).length;

  const rejected = _reimburses.filter(
    (reimburse) => reimburse.status === ReimburseStatusEnum.rejected,
  ).length;

  return (
    <SimpleGrid cols={4}>
      <Card withBorder shadow="xs">
        <Flex align="center" direction="column">
          <List size={36} />
          <Text>Total Diajukan</Text>
          <Text>{all}</Text>
        </Flex>
      </Card>
      <Card withBorder shadow="xs">
        <Flex align="center" direction="column">
          <ClockClockwise size={36} />
          <Text>Total Pending</Text>
          <Text>{pending}</Text>
        </Flex>
      </Card>
      <Card withBorder shadow="xs">
        <Flex align="center" direction="column">
          <CheckCircle size={36} />
          <Text>Total Diterima</Text>
          <Text>{finished}</Text>
        </Flex>
      </Card>
      <Card withBorder shadow="xs">
        <Flex align="center" direction="column">
          <XCircle size={36} />
          <Text>Total Ditolak</Text>
          <Text>{rejected}</Text>
        </Flex>
      </Card>
    </SimpleGrid>
  );
}
