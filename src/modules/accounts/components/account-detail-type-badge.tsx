import { Badge } from '@mantine/core';

import { AccountDetailTypeEnum } from './account-form-type';

export default function AccountDetailTypeBadge(props: {
  jenis: AccountDetailTypeEnum;
}) {
  switch (props.jenis) {
    case AccountDetailTypeEnum.outcome:
      return <Badge color="red">Pengeluaran</Badge>;
    case AccountDetailTypeEnum.income:
      return <Badge color="green">Pemasukan</Badge>;
    default:
      return <Badge color="gray">Invalid Type</Badge>;
  }
}
