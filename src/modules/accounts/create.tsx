import { useCreateAccount } from 'api-hooks/account/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import AccountForm from './components/account-form';

export default function AccountCreate() {
  const { mutateAsync } = useCreateAccount();
  const { replace } = useRouter();
  return (
    <AccountForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.accounts);
        notification.success({
          message: result.message,
        });
      }}
    />
  );
}
