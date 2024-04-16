import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import UserList from 'modules/user/list';
import { NextPageWithLayout } from 'pages/_app';

export default UserList;

(UserList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createUser}>
      {page}
    </ListLayout>
  );
};
