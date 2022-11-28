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
  hideNav: () => void;
};

const AdminNav = [
  {
    to: 'dashboard',
    name: 'Dashboard',
    icon: <BsGrid1X2Fill className="admin-navbar__icon" />,
  },
  {
    to: 'category',
    name: 'Category',
    icon: <BiCategoryAlt className="admin-navbar__icon" />,
  },
  {
    to: 'product',
    name: 'Product',
    icon: <AiOutlinePicLeft className="admin-navbar__icon" />,
  },
  {
    to: 'order',
    name: 'Order',
    icon: <BsReceiptCutoff className="admin-navbar__icon" />,
  },
  {
    to: 'account',
    name: 'Account',
    icon: <FaUserCircle className="admin-navbar__icon" />,
  },
];

const AdminNavbar = ({ isActive, hideNav }: AdminNavbarProps) => {
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
      {AdminNav.map((nav, i) => {
        return (
          <NavLink
            key={i}
            to={nav.to}
            className={({ isActive }) =>
              isActive
                ? 'admin-navbar__item admin-navbar__item--active'
                : 'admin-navbar__item'
            }
            onClick={hideNav}
          >
            {nav.icon}
            <h3 className="admin-navbar__heading">{nav.name}</h3>
          </NavLink>
        );
      })}
    </div>
  );
};
export default AdminNavbar;
