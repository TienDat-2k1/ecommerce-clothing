import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { BsCart4 } from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';

import './Header.scss';
import { useAppSelector } from '../../hooks/hooks';
const Header = () => {
  const navigate = useNavigate();
  const [isNavActive, setIsNavActive] = useState(false);
  const [isCartHightLight, setIsCartHightLight] = useState(false);

  const totalItem = useAppSelector(state => state.cart.totalItem);

  useEffect(() => {
    if (totalItem === 0) return;

    setIsCartHightLight(true);

    const timer = setTimeout(() => {
      setIsCartHightLight(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [totalItem]);

  const activeNavHandler = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/">
          <div className="header__logo">
            <h1>SFASHION</h1>
          </div>
        </Link>
        <Navbar isNavActive={isNavActive} setIsNavActive={setIsNavActive} />
        {isNavActive && (
          <div className="overlay" onClick={activeNavHandler}></div>
        )}

        <div className="header__features">
          <div className="header__feature">
            <BiSearchAlt2 className="header__icon" />
          </div>
          <div
            className="header__feature"
            onClick={() => {
              navigate('/checkout');
            }}
          >
            <BsCart4 className="header__icon" />
            <div className={`header__cart-count ${isCartHightLight && 'bump'}`}>
              {totalItem}
            </div>
          </div>
          <div
            className="header__feature header__feature-nav"
            onClick={activeNavHandler}
          >
            <FaBars className="header__icon" />
          </div>
          <div className="header__feature header__feature-login">
            <Link to="/auth" className="btn">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
