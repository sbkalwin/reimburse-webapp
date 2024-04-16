import Login from 'modules/login/login';

import { NextPageWithLayout } from './_app';

export default Login;

(Login as NextPageWithLayout).getLayout = (page) => page;
