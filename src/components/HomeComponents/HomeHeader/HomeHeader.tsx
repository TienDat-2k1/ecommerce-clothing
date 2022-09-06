import './HomeHeader.scss';

import HomeBG from '../../../assets/img/header-background.jpg';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  return (
    <section className="home__header">
      <div className="dot-texture"></div>
      <div className="dot-texture"></div>
      <div className="dot-texture"></div>
      <div className="home-header__layout container">
        <div className="home-header__layout-l">
          <h1 className="layout__title">Find the best fashion style for you</h1>
          <p className="layout__description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et soluta
            minima neque quam officia excepturi odio aliquid ipsam expedita cum,
            debitis optio, mollitia alias dolore ab vero ea, eum libero!
          </p>
          <button
            className="btn layout__btn"
            onClick={() => {
              navigate('/products');
            }}
          >
            SHOP NOW
          </button>
        </div>
        <div className="home-header__layout-r">
          <div>
            <img src={HomeBG} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeHeader;
