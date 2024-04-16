import { Flex } from '@mantine/core';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';

import { teams } from './components/team-form-type';
import TeamItem from './components/team-item';

export function TeamListLayout({ children }) {
  return (
    <ListLayout createNavigation={NavigationRoutes.createTeam}>
      {children}
    </ListLayout>
  );
}

export default function TeamList() {
  return (
    <Flex direction="column">
      {teams.map((team) => (
        <TeamItem key={team.id} {...team} />
      ))}
    </Flex>
  );
}
