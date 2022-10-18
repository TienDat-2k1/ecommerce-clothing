import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/header/Header';
import './Main.scss';

const Main = () => {
  return (
    <>
      <Header />
      <div className="app-main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Main;
