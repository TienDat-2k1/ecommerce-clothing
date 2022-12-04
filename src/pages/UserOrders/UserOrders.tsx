import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { currencyFormat } from '../../utils/currencyFormat';
import { OrderModel, StatusOrder } from '../../utils/types';

import './UserOrders.scss';

type UserOrder = {
  'Receive order': OrderModel[];
  Confirm: OrderModel[];
  Shipping: OrderModel[];
  Success: OrderModel[];
  Cancelled: OrderModel[];
  Return: OrderModel[];
};

const statusShow = [
  'Receive order',
  'Confirm',
  'Shipping',
  'Success',
  'Cancelled',
  'Return',
];

const UserOrders = () => {
  const axiosPrivate = useAxiosPrivate();

  const [userOrders, setUserOrders] = useState<UserOrder>({
    'Receive order': [],
    Confirm: [],
    Shipping: [],
    Success: [],
    Cancelled: [],
    Return: [],
  } as UserOrder);
  const [status, setStatus] =
    useState<keyof typeof StatusOrder>('Receive order');

  useEffect(() => {
    axiosPrivate
      .get('user/me')
      .then(res => {
        const orders: OrderModel[] | undefined = res.data.data?.data?.orders;

        const userOr = orders?.reduce(
          (finalOrder, order) => {
            switch (order.status) {
              case 'Receive order':
                finalOrder['Receive order'] = [
                  ...finalOrder['Receive order'],
                  order,
                ];
                break;
              case 'Confirm':
                finalOrder.Confirm = [...finalOrder.Confirm, order];
                break;
              case 'Shipping':
                finalOrder.Shipping = [...finalOrder.Shipping, order];
                break;
              case 'Success':
                finalOrder.Success = [...finalOrder.Success, order];
                break;
              case 'Cancelled':
                finalOrder.Cancelled = [...finalOrder.Cancelled, order];
                break;
              case 'Return':
                finalOrder.Return = [...finalOrder.Return, order];
                break;
            }
            return finalOrder;
          },
          {
            'Receive order': [],
            Confirm: [],
            Shipping: [],
            Success: [],
            Cancelled: [],
            Return: [],
          } as UserOrder
        );

        userOr && setUserOrders(userOr);
      })
      .catch(e => {
        console.log(e);
      });
  }, [axiosPrivate]);

  return (
    <div className="user-orders">
      {/* <h3>Đơn hàng của bạn</h3> */}
      <div className="user-orders__status">
        {statusShow.map((s, i) => {
          return (
            <span
              key={i}
              className={status === s ? 'active' : ''}
              onClick={() => {
                setStatus(s as keyof typeof StatusOrder);
              }}
            >
              <span>{StatusOrder[s as keyof typeof StatusOrder]}</span>
              {!!userOrders[s as keyof typeof StatusOrder].length && (
                <span>{userOrders[s as keyof typeof StatusOrder].length}</span>
              )}
            </span>
          );
        })}
      </div>
      <div className="user-orders__list">
        {!userOrders[status].length && (
          <i style={{ textAlign: 'center', marginTop: '2rem' }}>
            Chưa có đơn hàng nào
          </i>
        )}
        {userOrders[status].map(order => {
          const dateTime = new Intl.DateTimeFormat('vn-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(order.createAt));

          const [date, time] = dateTime.split(', ');
          return (
            <Link
              to={`${order._id}`}
              key={order._id}
              className="user-orders__item"
            >
              <div className="user-orders__content">
                <span>{date}</span>
                <span>{time}</span>
              </div>
              <div className="user-orders__content">
                <span>Sản phẩm </span>
                <div className="user-orders__products">
                  {order.items.map((item, i) => {
                    return (
                      <div key={i} className="user-orders__product">
                        <h4>{item.product.name}</h4>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '4px',
                            minWidth: '40px',
                          }}
                        >
                          <span>{item.size}</span>
                          <span>x{item.quantity}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="user-orders__content">
                <span>Tổng tiền</span>
                <span>{currencyFormat(order.totalPrice)}</span>
              </div>
              <div className="user-orders__content">
                <span>Trạng thái </span>
                <span>
                  {StatusOrder[order.status as keyof typeof StatusOrder]}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default UserOrders;
