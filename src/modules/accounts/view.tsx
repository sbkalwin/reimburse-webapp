import { useRouter } from 'next/router';

import AccountForm from './components/account-form';

export default function AccountView() {
  const { query } = useRouter();
  const id = query.id;

  return <AccountForm />;
}
