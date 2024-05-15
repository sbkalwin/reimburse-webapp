import { useCreateEmployee } from 'api-hooks/employee/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import UserForm from './components/user-form';

export default function UserCreate() {
  const { mutateAsync } = useCreateEmployee();
  const { replace } = useRouter();
  return (
    <UserForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.users);
        notification.success({
          message: result.message,
        });
      }}
    />
  );
}
