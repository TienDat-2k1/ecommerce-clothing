import { FiArrowLeft } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetOrderQuery } from '../../features/Order/orderApiSlice';
import { axiosPrivate } from '../../utils/httpRequest';

import imageProduct from '../../utils/imageProduct';
import { StatusOrder } from '../../utils/types';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import './OrderDetail.scss';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, isFetching, refetch } = useGetOrderQuery(orderId);

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

  return (
    <>
      {isFetching && <Spinner />}
      {data && (
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
              <h4>Tiến Đạt</h4>
              <span>0985071445</span>
              <span>
                Tổ dân phố 4, Phường Phổ Minh, Thị Xã Đức Phổ, Quảng Ngãi
              </span>
            </div>
            <div>
              <span>
                Trạng thái đơn hàng:{' '}
                <i>{StatusOrder[data?.status as keyof typeof StatusOrder]}</i>
              </span>
              <span>
                Phương thức thanh toán: <i>Thanh toán khi nhận hàng</i>
              </span>
              <span>Tổng tiền hàng: ${data?.totalPrice}</span>
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
                <span>
                  {item.price} <sup>$</sup>
                </span>
              </Link>
            ))}
          </div>
          <div className="order-detail__cta">
            <Button
              className="btn--red"
              disabled={!['Receive order', 'Confirm'].includes(data.status)}
              onClick={() => cancelOrderHandler(orderId)}
            >
              Hủy đơn hàng
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetail;
