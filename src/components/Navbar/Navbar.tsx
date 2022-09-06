import './Navbar.scss';
import { AiOutlineLogout } from 'react-icons/ai';

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
          <a href="#" className="nav__list--link">
            men
          </a>
        </li>
        <li className="nav__list-item">
          <a href="#" className="nav__list--link">
            woman
          </a>
        </li>
        <li className="nav__list-item">
          <a href="#" className="nav__list--link">
            kids
          </a>
        </li>
        <li className="nav__list-item">
          <a href="#" className="nav__list--link">
            collection
          </a>
        </li>
        <li className="nav__list-item">
          <a href="#" className="nav__list--link">
            trends
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
