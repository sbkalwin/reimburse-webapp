import NavigationRoutes from 'components/common/side-navigation/navigations';
import { ListLayout } from 'modules/common/layout';
import StationeryList from 'modules/stationery/list';
import { NextPageWithLayout } from 'pages/_app';

export default StationeryList;

(StationeryList as NextPageWithLayout).getLayout = (page) => {
  return (
    <ListLayout createNavigation={NavigationRoutes.createStationery}>
      {page}
    </ListLayout>
  );
};
