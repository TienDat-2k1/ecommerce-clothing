import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { isLoggedSelector, userSelector } from '../../store/user/userSelector';

type RequireAuthProps = {
  allowedRoles: 'admin' | 'user';
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const location = useLocation();

  const isLogged = useSelector(isLoggedSelector);
  const user = useSelector(userSelector);

  return user.role && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : isLogged ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
export default RequireAuth;
