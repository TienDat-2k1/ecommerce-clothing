import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { BsCart4 } from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';

import './Header.scss';
const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const activeNavHandler = () => {
    setIsNavActive(!isNavActive);
  };
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header__logo">
          <h1>SFASHION</h1>
        </div>
        <Navbar isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        {isNavActive && (
          <div className="overlay" onClick={activeNavHandler}></div>
        )}

        <div className="header__features">
          <div className="header__feature">
            <BiSearchAlt2 className="header__icon" />
          </div>
          <div className="header__feature">
            <BsCart4 className="header__icon" />
            <span className="header__cart-count">3</span>
          </div>
          <div
            className="header__feature header__feature-nav"
            onClick={activeNavHandler}
          >
            <FaBars className="header__icon" />
          </div>
          <div className="header__feature header__feature-login">
            <button className="btn">LOGIN</button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
