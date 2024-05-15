import { Card, SimpleGrid, Text } from '@mantine/core';
import { FileMinus, FilePlus, FileText } from '@phosphor-icons/react';
import { string2money } from 'common/helpers/string';

import { AccountModel } from './account-form-type';

export interface AccountStatisticProps {
  accountId?: string;
  filter?: (account: AccountModel) => boolean;
}

export default function AccountStatistic(props: AccountStatisticProps) {
  return (
    <SimpleGrid cols={3}>
      <Card withBorder shadow="xs">
        <FileText size={36} />
        <Text>Total</Text>
        <Text>Rp. {string2money(0)}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <FilePlus size={36} />
        <Text>Pemasukan</Text>
        <Text>Rp. {string2money(0)}</Text>
      </Card>
      <Card withBorder shadow="xs">
        <FileMinus size={36} />
        <Text>Pengeluaran</Text>
        <Text>Rp. {string2money(0)}</Text>
      </Card>
    </SimpleGrid>
  );
}
