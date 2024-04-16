import { Flex } from '@mantine/core';

import { accounts } from './components/account-form-type';
import AccountItem from './components/account-item';

export default function AccountList() {
  return (
    <Flex direction="column">
      {accounts.map((account) => {
        return <AccountItem key={account.id} {...account} />;
      })}
    </Flex>
  );
}
