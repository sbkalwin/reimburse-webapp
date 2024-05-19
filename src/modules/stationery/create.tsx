import { useCreateStationery } from 'api-hooks/stationery/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import StationeryForm from './components/stationery-form';

export default function StationeryCreate() {
  const { mutateAsync } = useCreateStationery();
  const { replace } = useRouter();

  return (
    <StationeryForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.stationaries);
        notification.success({
          message: result.message,
        });
      }}
    />
  );
}
