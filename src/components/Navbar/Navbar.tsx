import './Navbar.scss';
import { AiOutlineLogout } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

interface INav {
  isNavActive: boolean;
  setIsNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isNavActive }: INav) => {
  return (
    <nav className={`nav ${isNavActive ? 'nav--active' : ''}`}>
      <div className="nav__user">
        <img
          src="https://lh3.googleusercontent.com/ogw/AOh-ky1AQjKplE11WsHjDkVdV_wxr5cjEkJFEKjKOEHt0w=s32-c-mo"
          alt="user"
        />
        <h2>To nguyen tien dat</h2>
        <AiOutlineLogout className="nav__user-icon" />
      </div>

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
