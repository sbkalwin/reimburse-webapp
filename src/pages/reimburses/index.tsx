import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import ReimburseList from 'modules/reimburse/list';
import { NextPageWithLayout } from 'pages/_app';

export default ReimburseList;

(ReimburseList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createReimburse}>
      {page}
    </ListLayout>
  );
};
