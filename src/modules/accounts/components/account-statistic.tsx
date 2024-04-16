import { Card, SimpleGrid, Text } from '@mantine/core';
import { FileMinus, FilePlus, FileText } from '@phosphor-icons/react';
import { string2money } from 'common/helpers/string';

import {
  AccountDetailTypeEnum,
  AccountModel,
  accounts,
} from './account-form-type';

export interface AccountStatisticProps {
  accountId?: string;
  filter?: (account: AccountModel) => boolean;
}

export default function AccountStatistic(props: AccountStatisticProps) {
  const _accounts = accounts
    .filter((account) => !props.accountId || account.id === props.accountId)
    .filter((value) => !props.filter || props.filter?.(value));

  const details = _accounts.map((account) => account.details).flat();

  const outcome = details.filter(
    (detail) => detail.jenis === AccountDetailTypeEnum.outcome,
  );
  const income = details.filter(
    (detail) => detail.jenis === AccountDetailTypeEnum.income,
  );

  const totalOutcome = outcome.reduce((prev, item) => prev + item.total, 0);
  const totalIncome = income.reduce((prev, item) => prev + item.total, 0);
  const totalDetails = totalIncome - totalOutcome;

  return (
    <SimpleGrid cols={3}>
      <Card withBorder shadow="xs">
        <FileText size={36} />
        <Text>Total</Text>
        <Text>Rp. {string2money(totalDetails)}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <FilePlus size={36} />
        <Text>Pemasukan</Text>
        <Text>Rp. {string2money(totalIncome)}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <FileMinus size={36} />
        <Text>Pengeluaran</Text>
        <Text>Rp. {string2money(totalOutcome)}</Text>
      </Card>
    </SimpleGrid>
  );
}
