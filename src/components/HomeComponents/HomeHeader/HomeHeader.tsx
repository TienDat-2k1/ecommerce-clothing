import './HomeHeader.scss';

import HomeBG from '../../../assets/img/header-background.jpg';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';

const HomeHeader = () => {
  return (
    <section className="home__header">
      <div className="dot-texture"></div>
      <div className="dot-texture"></div>
      <div className="dot-texture"></div>
      <div className="home-header__layout container">
        <div className="home-header__layout-l">
          <h1 className="layout__title">
            Find the best fashion style for you.
          </h1>
          <p className="layout__description">
            The key to looking great isn't following all of the latest fashion
            trends. It's staying true to your personal style. But what if you
            don't know what your style is? You can develop your unique style by
            searching for inspiration and experimenting with fashion with us.
          </p>
          <Button
            as={Link}
            to="/products"
            className="btn--primary-dark btn--shadow layout__btn"
          >
            SHOP NOW
          </Button>
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
