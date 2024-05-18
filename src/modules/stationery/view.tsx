import { useUpdateStationery } from 'api-hooks/stationery/mutation';
import { stationeryKeys, useGetStationery } from 'api-hooks/stationery/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import StationeryForm from './components/stationery-form';

export default function StationeryView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryGetStationery = useGetStationery({ input: { id } });
  const { mutateAsync } = useUpdateStationery();
  return (
    <LoaderView query={queryGetStationery}>
      {(data) => {
        return (
          <StationeryForm
            stationery={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ id, data: values });
              queryClient.refetchQueries({
                queryKey: stationeryKeys.stationeryKey({ id }),
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
