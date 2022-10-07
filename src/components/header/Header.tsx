import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import HeaderCta from './HeaderCta';
import './Header.scss';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const activeNavHandler = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/">
          <div className="header__logo">
            <h1>SFashion</h1>
          </div>
        </Link>
        <Navbar isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        {isNavActive && (
          <div className="overlay" onClick={activeNavHandler}></div>
        )}

        {/* header cta */}
        <HeaderCta onActiveNav={activeNavHandler} />
      </div>
    </header>
  );
};
export default Header;
