import { useGetOrdersQuery } from '../../../features/Order/orderApiSlice';

import Spinner from '../../UI/Spinner/Spinner';
import ShipperOrderItem from '../ShipperOrderItem/ShipperOrderItem';

import './ShipperOrder.scss';

const ShipperOrder = () => {
  // const [orders, setOrders] = useState<OrderModel[]>([]);

  const { data, isFetching, refetch } = useGetOrdersQuery({
    status: 'Confirm',
    sort: 'createAt',
  });

  const update = () => {
    refetch();
  };

  return (
    <>
      {isFetching && <Spinner />}
      {data && (
        <div className="shipper">
          {!data.length && (
            <i style={{ display: 'block', textAlign: 'center' }}>
              Chưa có đơn hàng mới
            </i>
          )}
          {data.map(order => (
            <ShipperOrderItem
              key={order._id}
              data={order}
              updateList={update}
              status={order.status}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default ShipperOrder;
