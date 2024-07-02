import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import { FileMinus, FilePlus, FileText } from '@phosphor-icons/react';
import {
  AccountDetailTypeEnum,
  AccountLiteModel,
} from 'api-hooks/account/model';
import { useGetAccountDetails } from 'api-hooks/account/query';
import { string2money } from 'common/helpers/string';
import LoaderView from 'components/loader-view';

export interface AccountStatisticProps {
  accountId?: string;
  filter?: (account: AccountLiteModel) => boolean;
}

export default function AccountStatistic(props: AccountStatisticProps) {
  const queryGetAccountDetails = useGetAccountDetails();

  return (
    <LoaderView query={queryGetAccountDetails} isCompact>
      {(data) => {
        const income = data
          .filter((data) => data.jenis === AccountDetailTypeEnum.income)
          .reduce((prev, detail) => {
            return prev + detail.total;
          }, 0);
        const outcome = data
          .filter((data) => data.jenis === AccountDetailTypeEnum.outcome)
          .reduce((prev, detail) => {
            return prev + detail.total;
          }, 0);
        const total = income - outcome;
        return (
          <>
            <SimpleGrid cols={2}>
              <Card>
                <Flex direction="column" justify="center" align="center">
                  <FileText size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Total
                  </Text>
                  <Text>Rp. {string2money(total)}</Text>
                </Flex>
              </Card>
              <Card>
                <Flex direction="column" justify="center" align="center">
                  <FilePlus size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Pemasukan
                  </Text>
                  <Text>Rp. {string2money(income)}</Text>
                </Flex>
              </Card>
              <Card>
                <Flex direction="column" justify="center" align="center">
                  <FileMinus size={36} />
                  <Text ta="center" fw={600} mt={8}>
                    Pengeluaran
                  </Text>
                  <Text>Rp. {string2money(outcome)}</Text>
                </Flex>
              </Card>
            </SimpleGrid>
          </>
        );
      }}
    </LoaderView>
  );
}
