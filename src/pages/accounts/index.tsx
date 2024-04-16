import NavigationRoutes from 'components/common/side-navigation/navigations';
import AccountList from 'modules/accounts/list';
import { ListLayout } from 'modules/common/layout';
import { NextPageWithLayout } from 'pages/_app';

export default AccountList;

(AccountList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createAccount}>
      {page}
    </ListLayout>
  );
};
