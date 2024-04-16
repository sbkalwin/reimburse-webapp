import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import ItinenaryList from 'modules/itinenary/list';
import { NextPageWithLayout } from 'pages/_app';

export default ItinenaryList;

(ItinenaryList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createItinerary}>
      {page}
    </ListLayout>
  );
};
