import { useEffect, useState } from 'react';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDebounce from '../../hooks/useDebounce';
import { OrderModel } from '../../Model/orderModel';
import AdminOrderItem from './AdminOrderItem';
import './AdminOrders.scss';

const AdminOrders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const keyDebounce = useDebounce(searchKey, 500);

  useEffect(() => {
    const fetchOrders = async (key: string) => {
      const res = await axiosPrivate.get('orders', {
        params: {
          key,
        },
      });
      if (res.status === 200) {
        setOrders(res.data.data.data);
        setIsUpdate(false);
      }
    };
    fetchOrders(keyDebounce);
  }, [axiosPrivate, keyDebounce, isUpdate]);

  const searchKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const onUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <>
      <div className="admin-order">
        <div className="admin-order__header">
          <div className="admin-order__search">
            <SearchInput
              value={searchKey}
              onChange={searchKeyChange}
              onClear={() => setSearchKey('')}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="admin-order__heading">
          <div className="admin-order__title">
            <h4>CREATED</h4>
          </div>
          <div className="admin-order__title">
            <h4>CUSTOMER</h4>
          </div>
          <div className="admin-order__title">
            <h4>PHONE</h4>
          </div>
          <div className="admin-order__title">
            <h4>PRODUCTS</h4>
          </div>
          <div className="admin-order__title">
            <h4>STATUS</h4>
          </div>
          <div className="admin-order__title">
            <h4>PRICE</h4>
          </div>
        </div>
        <div className="admin-order__list">
          {orders.map(order => {
            const dateTime = new Intl.DateTimeFormat('vn-VN', {
              dateStyle: 'short',
              timeStyle: 'short',
            }).format(new Date(order.createAt));
            const [date, time] = dateTime.split(', ');

            return (
              <AdminOrderItem
                key={order._id}
                date={date}
                time={time}
                order={order}
                onUpdate={onUpdate}
              />
            );
          })}
        </div>
        <div className="admin-order__footer"></div>
      </div>
    </>
  );
};
export default AdminOrders;
