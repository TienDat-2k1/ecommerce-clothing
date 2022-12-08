import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import HeaderUser from '../../components/header/HeaderUser';
import useWindowDimension from '../../hooks/useWindowDimension';

import './Admin.scss';

type AdminProps = {
  role?: 'admin' | 'shipper';
};

const Admin = ({ role = 'admin' }: AdminProps) => {
  const { width } = useWindowDimension();
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isOnlyIcon, setIsOnlyIcon] = useState(false);

  const togglerHandler = () => {
    if (width > 992) {
      setIsOnlyIcon(!isOnlyIcon);
    } else {
      setIsNavbarActive(true);
    }
  };
  const hideNavHandler = () => {
    setIsNavbarActive(false);
  };

  return (
    <main className="admin">
      <div className="admin-header">
        <section>
          <div className="admin-toggle-navbar" onClick={togglerHandler}>
            <FaBars />
          </div>
          <Link to="" className="admin-header__logo">
            SFashion
          </Link>
        </section>
        <section>
          <HeaderUser />
          {/* <div className="navbar-account">
            <h4>{user.name}</h4>
            <LazyLoadImage
              src={imageUser(user.photo)}
              wrapperClassName="navbar-account__avatar"
              effect="blur"
            />
          </div> */}
        </section>
      </div>
      <div className="admin-content">
        <div
          className={`admin-toggle-overlay ${
            isNavbarActive && width < 992 ? 'admin-toggle-overlay--active' : ''
          }`}
          onClick={hideNavHandler}
        ></div>
        <AdminNavbar
          isActive={isNavbarActive}
          hideNav={hideNavHandler}
          isOnlyIcon={isOnlyIcon}
          role={role}
        />
        <div className={`admin-data ${isOnlyIcon ? 'only-icon' : ''}`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default Admin;
