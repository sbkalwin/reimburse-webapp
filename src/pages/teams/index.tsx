import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import TeamList from 'modules/team/list';
import { NextPageWithLayout } from 'pages/_app';

export default TeamList;

(TeamList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createTeam}>
      {page}
    </ListLayout>
  );
};
