import { useRouter } from 'next/router';

import AccountForm from './components/account-form';
import { accounts } from './components/account-form-type';

export default function AccountView() {
  const { query } = useRouter();
  const id = query.id;

  const account = accounts.find((account) => account.id === id);
  return <AccountForm account={account} />;
}
