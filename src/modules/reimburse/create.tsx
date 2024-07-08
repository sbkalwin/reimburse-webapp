import { useCreateReimburse } from 'api-hooks/reimburse/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import ReimburseForm from './components/reimburse-form';

export default function ReimburseCreate() {
  const { mutateAsync } = useCreateReimburse();
  const { replace } = useRouter();
  return (
    <ReimburseForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.reimburses);
        notification.success({
          message: result.message,
        });

        return result.data;
      }}
    />
  );
}
