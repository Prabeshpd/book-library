import { Route, Routes, BrowserRouter } from 'react-router-dom';

import * as RoutePaths from '@/constants/routes';
import Registration from '@/pages/Registration/Registration';
import Login from '@/pages/Login/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.USER_REGISTER_ROUTE} element={<Registration />} />
        <Route path={RoutePaths.USER_LOGIN_ROUTE} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
