import { useUpdateEmployee } from 'api-hooks/employee/mutation';
import { employeeKeys, useGetMe } from 'api-hooks/employee/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';

import UserForm from './user/components/user-form';

export default function Profile() {
  const queryGetMe = useGetMe();
  const { mutateAsync } = useUpdateEmployee();

  return (
    <LoaderView query={queryGetMe}>
      {(data) => {
        return (
          <UserForm
            user={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ nip: data.nip, data: values });
              queryClient.refetchQueries({
                queryKey: employeeKeys.meKey(),
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
