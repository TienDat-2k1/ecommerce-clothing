import './Navbar.scss';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedSelector, userSelector } from '../../store/user/userSelector';
import imageUser from '../../utils/imageUser';
import { logout } from '../../store/user/userSlice';

interface INav {
  isNavActive: boolean;
  setIsNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isNavActive }: INav) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  const user = useSelector(userSelector);

  return (
    <nav className={`nav ${isNavActive ? 'nav--active' : ''}`}>
      {isLogged && (
        <div className="nav__user">
          <img src={imageUser(user.photo)} alt="user" />
          <h2>
            <Link to="me">{user.name}</Link>
          </h2>
          <AiOutlineLogout
            className="nav__user-icon"
            onClick={() => dispatch(logout())}
          />
        </div>
      )}

      {!isLogged && (
        <div className="nav__user">
          <Link to="/auth">SIGN IN / REGISTER</Link>
          {/* <AiOutlineLogout className="nav__user-icon" /> */}
        </div>
      )}

      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'nav__list--link nav__list--link--active'
                : 'nav__list--link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'nav__list--link nav__list--link--active'
                : 'nav__list--link'
            }
          >
            Product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
