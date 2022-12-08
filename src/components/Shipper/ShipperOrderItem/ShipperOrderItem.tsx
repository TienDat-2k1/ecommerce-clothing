import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateOrderMutation } from '../../../features/Order/orderApiSlice';
import { userSelector } from '../../../store/user/userSelector';
import { currencyFormat } from '../../../utils/currencyFormat';
import { OrderModel } from '../../../utils/types';
import Button from '../../UI/Button/Button';

type ShipperOrderItemProps = {
  data: OrderModel;
  status?: string;
  timeUpdate?: boolean;
  updateList?: () => void;
};

const ShipperOrderItem = ({
  data,
  status,
  timeUpdate = false,
  updateList,
}: ShipperOrderItemProps) => {
  const navigate = useNavigate();
  const [updateOrder, result] = useUpdateOrderMutation();
  const user = useSelector(userSelector);

  const datetime = Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
    .format(timeUpdate ? new Date(data.updatedAt) : new Date(data.createdAt))
    .split(', ');

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Thành công!!');
      if (typeof updateList === 'function') updateList();
    }

    if (result.isError) {
      toast.warn('Có lỗi xảy ra, vui lòng thử lại');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isSuccess, result.isError]);

  const getOrder = (id: string) => {
    updateOrder({ id, status: 'Shipping', shipper: user.id });
  };

  const shipped = (id: string) => {
    updateOrder({ id, status: 'Success', shipper: user.id });
  };

  return (
    <article
      className="shipper__order"
      onClick={() => {
        navigate(data._id);
      }}
    >
      <div className="shipper__order-content">
        <span>{datetime[1]}</span>
        <span>{datetime[0]}</span>
      </div>
      <div className="shipper__order-content">
        <span>Khách hàng</span>
        <span>{data.customer.name}</span>
      </div>
      <div className="shipper__order-content">
        <span>Số điện thoại</span>
        <span>{data.phone}</span>
      </div>
      <div className="shipper__order-content">
        <span>Địa chỉ</span>
        <span>{data.address}</span>
      </div>
      <div className="shipper__order-content">
        <span>Tổng tiền hàng</span>
        <span>{currencyFormat(data.totalPrice)}</span>
      </div>
      <div className="shipper__order-cta">
        {status === 'Confirm' && (
          <Button
            className="btn--primary"
            onClick={(e: Event) => {
              e.stopPropagation();
              getOrder(data._id);
            }}
          >
            Nhận đơn
          </Button>
        )}
        {status === 'Shipping' && (
          <Button
            className="btn--blue"
            onClick={(e: Event) => {
              e.stopPropagation();
              shipped(data._id);
            }}
          >
            Giao hàng
          </Button>
        )}
      </div>
    </article>
  );
};
export default ShipperOrderItem;
