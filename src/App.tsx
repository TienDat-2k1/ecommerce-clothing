import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

import AppLayout from './components/Layout/AppLayout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import Admin from './pages/Admin/Admin';
import Auth from './pages/auth/Auth';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import Checkout from './pages/Checkout/Checkout';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Main from './router/Main';
import './sass/_global.scss';
import { logginSuccess } from './store/user/userSlice';
import AdminAccounts from './views/Account/AdminAccounts';
import Dashboard from './views/Dashboard/Dashboard';
import AdminOrders from './views/Orders/AdminOrders';
import AdminProduct from './views/Products/AdminProduct';

function App() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axiosPrivate.get('/user/refresh');

        dispatch(
          logginSuccess({
            accessToken: res.data.token,
            user: res.data.data.user,
          })
        );
      } catch (error: any) {}
    };

    window.onload = () => {
      refresh();
    };
  }, [axiosPrivate, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* public routes */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route element={<Main />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<DetailProduct />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="/auth" element={<Auth />}>
            <Route index element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>

          {/* protect route */}
          <Route element={<RequireAuth allowedRoles="admin" />}>
            <Route path="admin" element={<Admin />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<AdminProduct />} />
              <Route path="order" element={<AdminOrders />} />
              <Route path="account" element={<AdminAccounts />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
    // <>
    //   <Routes>
    //     <Route path="/" element={<Main />}>
    //       <Route index element={<Home />} />
    //       <Route path="products" element={<Products />} />
    //       <Route path="products/:productId" element={<DetailProduct />} />
    //       <Route path="checkout" element={<Checkout />} />
    //     </Route>
    //     <Route path="/auth" element={<Auth />}>
    //       <Route index element={<SignInPage />} />
    //       <Route path="sign-up" element={<SignUpPage />} />
    //     </Route>
    //     <Route path="/admin"></Route>
    //   </Routes>
    // </>
  );
}

export default App;
