import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/store';

function PrivateRouteOutlet() {
  const { isLoggedIn } = useAppSelector((state) => state.authentication);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouteOutlet;
