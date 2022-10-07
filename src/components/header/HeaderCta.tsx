import { useState, useEffect } from 'react';

import { BsCart4 } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import './HeaderCta.scss';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';

type HeaderCtaProps = {
  onActiveNav: () => void;
};

const HeaderCta = ({ onActiveNav }: HeaderCtaProps) => {
  const navigate = useNavigate();
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

  return (
    <div className="header__features">
      <HeaderSearch />

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
        onClick={onActiveNav}
      >
        <FaBars className="header__icon" />
      </div>
      {/* header user */}
      <HeaderUser />
    </div>
  );
};
export default HeaderCta;
