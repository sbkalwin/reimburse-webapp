import { Flex, Text } from '@mantine/core';
import { useGetTeams } from 'api-hooks/team/query';
import colors from 'common/styles/colors';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import LoaderView from 'components/loader-view';
import { ListLayout } from 'modules/common/layout';

import TeamItem from './components/team-item';

export function TeamListLayout({ children }) {
  return (
    <ListLayout createNavigation={NavigationRoutes.createTeam}>
      {children}
    </ListLayout>
  );
}

export default function TeamList() {
  const queryGetTeams = useGetTeams();
  return (
    <LoaderView query={queryGetTeams}>
      {(data) => {
        return (
          <Flex direction="column">
            {data.length === 0 && (
              <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                No Result Found
              </Text>
            )}
            {data.map((team) => (
              <TeamItem key={team.id} {...team} />
            ))}
          </Flex>
        );
      }}
    </LoaderView>
  );
}
