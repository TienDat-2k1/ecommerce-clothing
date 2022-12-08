import { useEffect } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { FiArrowLeft } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from '../../features/Order/orderApiSlice';
import { userSelector } from '../../store/user/userSelector';
import { currencyFormat } from '../../utils/currencyFormat';
import { axiosPrivate } from '../../utils/httpRequest';

import imageProduct from '../../utils/imageProduct';
import { StatusOrder } from '../../utils/types';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import './OrderDetail.scss';

type OrderDetailProps = {
  role?: 'admin' | 'shipper' | 'user';
};

const OrderDetail = ({ role = 'user' }: OrderDetailProps) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, isFetching, refetch } = useGetOrderQuery(orderId);

  const [updateOrder, result] = useUpdateOrderMutation();
  const user = useSelector(userSelector);

  const cancelOrderHandler = (id: string | undefined) => {
    if (!id) return;
    axiosPrivate
      .get(`/orders/${id}/cancel`)
      .then(() => {
        refetch();
        toast.success('Huỷ đơn hàng thành công');
      })
      .catch(e => {
        toast.error('Có lỗi xảy ra!. Vui lòng thử lại!');
      });
  };

  useEffect(() => {
    if (result.isError) toast.warn('Có lỗi xảy ra. Vui lòng thử lại!!');
    if (result.isSuccess) toast.success('Thành công!');
  }, [result]);

  // const cancelOrder = (id: string) => {
  //   updateOrder({ id, status: 'Confirm' });
  //   refetch();
  // };

  const confirmOrder = (id: string) => {
    updateOrder({ id, status: 'Confirm' });
    refetch();
  };

  const getOrder = (id: string) => {
    updateOrder({ id, status: 'Shipping', shipper: user.id });
    refetch();
  };

  const shipped = (id: string) => {
    updateOrder({ id, status: 'Success', shipper: user.id });
    refetch();
  };

  return (
    <>
      {isFetching && <Spinner />}
      {data && orderId && (
        <div className="order-detail">
          <div className="order-detail__content order-detail__heading">
            <span onClick={() => navigate(-1)}>
              <FiArrowLeft />
              <span>Quay lại</span>
            </span>
            <span>
              <span>ID ĐƠN HÀNG: {orderId}</span>
            </span>
          </div>
          <div className="order-detail__content order-detail__info">
            <div>
              <span>Địa chỉ nhận hàng</span>
              <h4>{data.customer.name}</h4>
              <span>
                <AiOutlinePhone /> {data.phone}
              </span>
              <span>
                <BiMap />
                {data.address}
              </span>
            </div>
            <div>
              <span>
                Cập nhật:
                <i>
                  {Intl.DateTimeFormat('vi-VN', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(new Date(data.updatedAt))}
                </i>
              </span>
              <span>
                Trạng thái đơn hàng:
                <i>{StatusOrder[data?.status as keyof typeof StatusOrder]}</i>
              </span>
              <span>
                Phương thức thanh toán: <i>Thanh toán khi nhận hàng</i>
              </span>
              <span>Tổng tiền hàng: {currencyFormat(data?.totalPrice)}</span>
            </div>
          </div>
          <div className="order-detail__content">
            {data?.items.map((item, i) => (
              <Link
                to={`/products/${item.product._id}`}
                key={i}
                className="order-item"
              >
                <LazyLoadImage
                  src={imageProduct(item.product.imageCover)}
                  effect="blur"
                  wrapperClassName="order-item__image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <span className="order-item__detail">
                  <h4>{item.product.name}</h4>
                  <span>Phân loại hàng: {item.size}</span>
                  <span>x{item.quantity}</span>
                </span>
                <span>{currencyFormat(item.price)}</span>
              </Link>
            ))}
          </div>
          <div className="order-detail__cta">
            {role === 'user' && (
              <Button
                className="btn--red"
                disabled={!['Receive order', 'Confirm'].includes(data.status)}
                onClick={() => cancelOrderHandler(orderId)}
              >
                Hủy đơn hàng
              </Button>
            )}
            {role === 'admin' && data.status === 'Receive order' && (
              <Button
                className="btn--yellow"
                onClick={() => confirmOrder(orderId)}
              >
                Xác nhận đơn hàng
              </Button>
            )}
            {role === 'shipper' && data.status === 'Confirm' && (
              <Button
                className="btn--primary"
                onClick={() => getOrder(orderId)}
              >
                Nhận đơn
              </Button>
            )}
            {role === 'shipper' && data.status === 'Shipping' && (
              <Button className="btn--blue" onClick={() => shipped(orderId)}>
                Giao hàng
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetail;
