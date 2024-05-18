import { useUpdateItinenary } from 'api-hooks/itinenary/mutation';
import { itinenaryKeys, useGetItinenary } from 'api-hooks/itinenary/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import IternaryForm from './components/itinenary-form';

export default function IternaryView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryGetItinenary = useGetItinenary({ input: { id } });
  const { mutateAsync } = useUpdateItinenary();
  return (
    <LoaderView query={queryGetItinenary}>
      {(data) => {
        return (
          <IternaryForm
            itinenary={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ id, data: values });
              queryClient.refetchQueries({
                queryKey: itinenaryKeys.itinenaryKey({ id }),
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
