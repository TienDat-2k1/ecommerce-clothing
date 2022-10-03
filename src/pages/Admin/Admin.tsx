import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchOrder = async () => {
      const order = await axiosPrivate.get('/orders');

      console.log(order);
    };

    fetchOrder();
  });
  return <div>Admin</div>;
};
export default Admin;
