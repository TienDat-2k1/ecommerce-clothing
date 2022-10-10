import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';

import './Admin.scss';

const Admin = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  const showNavHandler = () => {
    setIsNavbarActive(true);
  };
  const hideNavHandler = () => {
    setIsNavbarActive(false);
  };

  return (
    <main className="admin">
      <div className="admin-toggle-navbar" onClick={showNavHandler}>
        <AiOutlineBars />
      </div>
      <div
        className={`admin-toggle-overlay ${
          isNavbarActive ? 'admin-toggle-overlay--active' : ''
        }`}
        onClick={hideNavHandler}
      ></div>
      <AdminNavbar isActive={isNavbarActive} />
      <div className="admin-data">
        <Outlet />
      </div>
    </main>
  );
};
export default Admin;
