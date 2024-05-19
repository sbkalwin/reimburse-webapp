import { useUpdateAccount } from 'api-hooks/account/mutation';
import { accountKeys, useGetAccount } from 'api-hooks/account/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import AccountForm from './components/account-form';

export default function AccountView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryGetAccount = useGetAccount({ input: { id } });

  const { mutateAsync } = useUpdateAccount();

  return (
    <LoaderView query={queryGetAccount}>
      {(data) => {
        return (
          <AccountForm
            account={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ id, data: values });

              queryClient.refetchQueries({
                queryKey: accountKeys.accountKey({ id }),
              });
              notification.success({
                message: result.message,
              });
            }}
          />
        );
      }}
    </LoaderView>
  );
}
