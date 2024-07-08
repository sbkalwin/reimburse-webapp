import { useUpdateReimburse } from 'api-hooks/reimburse/mutation';
import { reimburseKeys, useGetReimburse } from 'api-hooks/reimburse/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import ReimburseForm from './components/reimburse-form';

export default function ReimburseView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryGetReimburse = useGetReimburse({ input: { id } });

  const { mutateAsync } = useUpdateReimburse();

  return (
    <LoaderView query={queryGetReimburse}>
      {(data) => {
        return (
          <>
            <ReimburseForm
              reimburse={data}
              onSubmit={async (values) => {
                const result = await mutateAsync({ id, data: values });

                queryClient.refetchQueries({
                  queryKey: reimburseKeys.reimburseKey({ id }),
                });
                notification.success({
                  message: result.message,
                });

                return result.data;
              }}
            />
          </>
        );
      }}
    </LoaderView>
  );
}
