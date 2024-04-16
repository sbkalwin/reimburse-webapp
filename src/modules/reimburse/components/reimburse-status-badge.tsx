import { Badge, Text } from '@mantine/core';

import { ReimburseStatusEnum } from './reimburse-form-type';

export default function ReimburseStatusBadge(props: {
  status: ReimburseStatusEnum;
}) {
  switch (props.status) {
    case ReimburseStatusEnum.pending:
      return <Badge color="yellow">Pending</Badge>;
    case ReimburseStatusEnum.finished:
      return <Badge color="green">Selesai</Badge>;
    case ReimburseStatusEnum.rejected:
      return <Badge color="red">Ditolak</Badge>;
    default:
      return <Text>Invalid Status</Text>;
  }
}
