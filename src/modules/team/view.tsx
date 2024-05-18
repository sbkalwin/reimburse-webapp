import { useUpdateTeam } from 'api-hooks/team/mutation';
import { teamKeys, useGetTeam } from 'api-hooks/team/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import TeamForm from './components/team-form';

export default function TeamView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryGetTeam = useGetTeam({
    input: { id },
  });

  const { mutateAsync } = useUpdateTeam();
  return (
    <LoaderView query={queryGetTeam}>
      {(data) => {
        return (
          <TeamForm
            team={data}
            onSubmit={async (values) => {
              const result = await mutateAsync({ id, data: values });

              queryClient.refetchQueries({
                queryKey: teamKeys.teamKey({ id }),
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
