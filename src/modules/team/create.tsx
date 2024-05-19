import { useCreateTeam } from 'api-hooks/team/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';

import TeamForm from './components/team-form';

export default function TeamCreate() {
  const { mutateAsync } = useCreateTeam();
  const { replace } = useRouter();

  return (
    <TeamForm
      onSubmit={async (values) => {
        const result = await mutateAsync(values);
        queryClient.invalidateQueries();
        replace(NavigationRoutes.teams);
        notification.success({
          message: result.message,
        });
      }}
    />
  );
}
