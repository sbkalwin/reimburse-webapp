import Home from 'modules/home/home';
import HomeLayout from 'modules/home/home-layout';

import { NextPageWithLayout } from './_app';

export default Home;

(Home as NextPageWithLayout).getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
