import { useGetMeQuery } from '../../../features/Auth/authApiSlice';
import Spinner from '../../UI/Spinner/Spinner';
import ShipperOrderItem from '../ShipperOrderItem/ShipperOrderItem';
import './ShipOrder.scss';

type ShipOrderProps = {
  status?: string;
};

const ShipOrder = ({ status }: ShipOrderProps) => {
  const { data, isFetching, refetch } = useGetMeQuery();

  const update = () => {
    refetch();
  };

  return (
    <>
      {isFetching && <Spinner />}
      {data && (
        <div className="shipper">
          {!data.ships?.length && (
            <i style={{ display: 'block', textAlign: 'center' }}>
              Chưa có đơn hàng mới
            </i>
          )}
          {data.ships
            ?.filter(order => order.status === status)
            ?.sort((a, b) => {
              if (status === 'Success') {
                return (
                  (new Date(b.updatedAt) as any) -
                  (new Date(a.updatedAt) as any)
                );
              }
              return (
                (new Date(a.updatedAt) as any) - (new Date(b.updatedAt) as any)
              );
            })
            .map(order => (
              <ShipperOrderItem
                key={order._id}
                data={order}
                status={order.status}
                updateList={update}
                timeUpdate
              />
            ))}
        </div>
      )}
    </>
  );
};
export default ShipOrder;
