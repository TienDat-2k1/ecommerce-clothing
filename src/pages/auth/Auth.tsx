import { Outlet } from 'react-router-dom';

import './auth.scss';

const Auth = () => {
  return (
    <div className="auth-wrapper">
      <Outlet />
    </div>
  );
};
export default Auth;
