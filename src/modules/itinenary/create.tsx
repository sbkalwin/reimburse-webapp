import { useCreateItinenary } from 'api-hooks/itinenary/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import ItinenaryForm from './components/itinenary-form';

export default function ItinenaryCreate() {
  const { mutateAsync } = useCreateItinenary();
  const { replace } = useRouter();

  return (
    <ItinenaryForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.itineraries);
        notification.success({
          message: result.message,
        });
      }}
    />
  );
}
