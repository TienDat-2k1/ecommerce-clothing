import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import Spinner from '../../components/UI/Spinner/Spinner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDebounce from '../../hooks/useDebounce';
import { OrderModel } from '../../utils/types';
import AdminOrderItem from './AdminOrderItem';
import './AdminOrders.scss';

const AdminOrders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageActive, setPageActive] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(false);

  const keyDebounce = useDebounce(searchKey, 500);

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async (key: string, page: number) => {
      const res = await axiosPrivate.get('orders', {
        params: {
          limit: 20,
          page,
          key,
        },
      });

      if (res.status === 200) {
        setOrders(res.data.data.data);
        setIsUpdate(false);
        setTotalPage(res.data.totalPages);
      }
      setIsLoading(false);
    };
    fetchOrders(keyDebounce, pageActive);
  }, [axiosPrivate, keyDebounce, isUpdate, pageActive]);

  const searchKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const onUpdate = () => {
    setIsUpdate(true);
  };

  const pageChangeHandler = (page: any) => {
    setPageActive(page.selected + 1);
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
          {isLoading && <Spinner />}
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
        {totalPage > 1 && (
          <div className="admin-order__footer">
            <Pagination
              totalPages={totalPage}
              onPageChange={pageChangeHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default AdminOrders;
