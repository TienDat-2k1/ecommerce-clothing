import { BsGrid1X2Fill, BsReceiptCutoff } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { AiOutlinePicLeft } from 'react-icons/ai';
import { FaShippingFast, FaUserCircle } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { FcShipped } from 'react-icons/fc';

import './AdminNavbar.scss';

type AdminNavbarProps = {
  isActive: boolean;
  hideNav: () => void;
  isOnlyIcon: boolean;
  role: 'admin' | 'shipper';
};

const AdminNav = [
  {
    to: 'dashboard',
    name: 'Dashboard',
    icon: <BsGrid1X2Fill className="admin-navbar__icon" />,
  },
  {
    to: 'category',
    name: 'Danh mục',
    icon: <BiCategoryAlt className="admin-navbar__icon" />,
  },
  {
    to: 'product',
    name: 'Sản phẩm',
    icon: <AiOutlinePicLeft className="admin-navbar__icon" />,
  },
  {
    to: 'order',
    name: 'Đơn hàng',
    icon: <BsReceiptCutoff className="admin-navbar__icon" />,
  },
  {
    to: 'account',
    name: 'Tài khoản',
    icon: <FaUserCircle className="admin-navbar__icon" />,
  },
];

const ShipperNav = [
  {
    to: 'order',
    name: 'Nhận đơn',
    icon: <BsReceiptCutoff className="admin-navbar__icon" />,
  },
  {
    to: 'shipping',
    name: 'Đang giao',
    icon: <FaShippingFast className="admin-navbar__icon" />,
  },
  {
    to: 'success',
    name: 'Đã giao',
    icon: <FcShipped className="admin-navbar__icon" />,
  },
];

const AdminNavbar = ({
  isActive,
  isOnlyIcon,
  role,
  hideNav,
}: AdminNavbarProps) => {
  const nav = role === 'admin' ? AdminNav : ShipperNav;
  return (
    <div
      className={`admin-navbar ${isActive ? 'admin-navbar--active' : ''} ${
        isOnlyIcon ? 'only-icon' : ''
      }`}
    >
      <span> MENU</span>
      {nav.map((nav, i) => {
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

// <div className="navbar-account">
// <LazyLoadImage
//   src={imageUser(user.photo)}
//   wrapperClassName="navbar-account__avatar"
//   effect="blur"
// />
// {/* <div className="navbar-account__avatar">
//   <img src={imageUser(user.photo)} alt="" />
// </div> */}
// <h4>{user.name}</h4>
// </div>
