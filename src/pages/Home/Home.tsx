import HomeHeader from '../../components/HomeComponents/HomeHeader/HomeHeader';
import HomeCollection from '../../components/Modal/HomeCollection/HomeCollection';
import HomeAbout from '../../components/HomeComponents/HomeAbout/HomeAbout';
import HomeBestSeller from '../../components/HomeComponents/HomeBestSeller/HomeBestSeller';
import HomeProducts from '../../components/HomeComponents/HomeProducts/HomeProducts';
import './Home.scss';

const Home = () => {
  return (
    <main className="home">
      {/* Section home header */}
      <HomeHeader />

      {/* Collection */}
      <HomeCollection />

      {/* best fashion */}
      <HomeAbout />

      {/* best seller */}
      <HomeBestSeller />

      {/* home product */}
      <HomeProducts />
    </main>
  );
};
export default Home;
