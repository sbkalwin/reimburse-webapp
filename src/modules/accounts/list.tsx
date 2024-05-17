import { Flex } from '@mantine/core';
import { useGetAccounts } from 'api-hooks/account/query';
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
