import { Flex, Text } from '@mantine/core';
import { useGetAccounts } from 'api-hooks/account/query';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';

import AccountItem from './components/account-item';

export default function AccountList() {
  const queryGetAccounts = useGetAccounts();
  return (
    <Flex direction="column">
      <LoaderView query={queryGetAccounts}>
        {(data) => {
          return (
            <>
              {data.length === 0 && (
                <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                  No Result Found
                </Text>
              )}
              {data.map((account) => {
                return <AccountItem key={account.id} {...account} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
