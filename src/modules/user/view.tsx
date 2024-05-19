import { useUpdateEmployee } from 'api-hooks/employee/mutation';
import { employeeKeys, useGetEmployee } from 'api-hooks/employee/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import UserForm from './components/user-form';

export default function UserView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryGetEmployee = useGetEmployee({ input: { id } });
  const { mutateAsync } = useUpdateEmployee();
  return (
    <LoaderView query={queryGetEmployee}>
      {(data) => {
        return (
          <UserForm
            user={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ nip: id, data: values });
              queryClient.refetchQueries({
                queryKey: employeeKeys.employeeKey({ id }),
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
