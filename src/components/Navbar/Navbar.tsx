import './Navbar.scss';
import { AiOutlineLogout } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
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
          <h2>{user.name}</h2>
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
          <Button as={Link} to="/" className="nav__list--link">
            Home
          </Button>
        </li>
        <li className="nav__list-item">
          <Button as={Link} to="/products" className="nav__list--link">
            Product
          </Button>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
