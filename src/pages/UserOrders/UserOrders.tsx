import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { OrderModel } from '../../utils/types';

import './UserOrders.scss';

const UserOrders = () => {
  const axiosPrivate = useAxiosPrivate();

  const [userOrders, setUserOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    const fetchOrderFromUser = async () => {
      const res = await axiosPrivate.get('user/me');

      setUserOrders(res.data.data.data.orders);
    };

    fetchOrderFromUser();
  }, [axiosPrivate]);

  return (
    <div className="user-orders">
      <h3>Your orders</h3>
      <div className="user-orders__list">
        {userOrders.map(order => {
          console.log(order);

          const dateTime = new Intl.DateTimeFormat('vn-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(order.createAt));

          console.log(dateTime);

          const [date, time] = dateTime.split(', ');
          return (
            <div key={order._id} className="user-orders__item">
              <div className="user-orders__content">
                <span>{date}</span>
                <span>{time}</span>
              </div>
              <div className="user-orders__content">
                <span>Products </span>
                <div className="user-orders__products">
                  {order.items.map((item, i) => {
                    return (
                      <div key={i} className="user-orders__product">
                        <h4>{item.product.name}</h4>
                        <span>{item.size}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="user-orders__content">
                <span>Total price </span>
                <span>${order.totalPrice}</span>
              </div>
              <div className="user-orders__content">
                <span>Status </span>
                <span>{order.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserOrders;
