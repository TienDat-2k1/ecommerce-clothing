import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/userSelector';
import { BsGrid1X2Fill, BsReceiptCutoff } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { AiOutlinePicLeft } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './AdminNavbar.scss';
import imageUser from '../../utils/imageUser';

type AdminNavbarProps = {
  isActive: boolean;
};

const AdminNavbar = ({ isActive }: AdminNavbarProps) => {
  const user = useSelector(userSelector);
  return (
    <div className={`admin-navbar ${isActive ? 'admin-navbar--active' : ''}`}>
      <div className="navbar-account">
        <LazyLoadImage
          src={imageUser(user.photo)}
          wrapperClassName="navbar-account__avatar"
          effect="blur"
        />
        {/* <div className="navbar-account__avatar">
          <img src={imageUser(user.photo)} alt="" />
        </div> */}
        <h4>{user.name}</h4>
      </div>
      <span>MAIN MENU</span>
      <NavLink
        to="dashboard"
        className={({ isActive }) =>
          isActive
            ? 'admin-navbar__item admin-navbar__item--active'
            : 'admin-navbar__item'
        }
      >
        <BsGrid1X2Fill className="admin-navbar__icon" />
        <h3 className="admin-navbar__heading">Dashboard</h3>
      </NavLink>
      <NavLink
        to="category"
        className={({ isActive }) =>
          isActive
            ? 'admin-navbar__item admin-navbar__item--active'
            : 'admin-navbar__item'
        }
      >
        <BiCategoryAlt className="admin-navbar__icon" />
        <h3 className="admin-navbar__heading">Categories</h3>
      </NavLink>
      <NavLink
        to="product"
        className={({ isActive }) =>
          isActive
            ? 'admin-navbar__item admin-navbar__item--active'
            : 'admin-navbar__item'
        }
      >
        <AiOutlinePicLeft className="admin-navbar__icon" />
        <h3 className="admin-navbar__heading">Products</h3>
      </NavLink>
      <NavLink
        to="order"
        className={({ isActive }) =>
          isActive
            ? 'admin-navbar__item admin-navbar__item--active'
            : 'admin-navbar__item'
        }
      >
        <BsReceiptCutoff className="admin-navbar__icon" />
        <h3 className="admin-navbar__heading">Orders</h3>
      </NavLink>
      <NavLink
        to="account"
        className={({ isActive }) =>
          isActive
            ? 'admin-navbar__item admin-navbar__item--active'
            : 'admin-navbar__item'
        }
      >
        <FaUserCircle className="admin-navbar__icon" />
        <h3 className="admin-navbar__heading">Accounts</h3>
      </NavLink>
    </div>
  );
};
export default AdminNavbar;
