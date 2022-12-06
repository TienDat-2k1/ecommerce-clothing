import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getAllDivisions } from '../../services/addressServices';
import {
  cartItemsSelector,
  cartTotalPriceSelector,
} from '../../store/cart/cartSelector';
import { removeAllCart } from '../../store/cart/cartSlice';
import { userSelector } from '../../store/user/userSelector';
import { currencyFormat } from '../../utils/currencyFormat';
import imageProduct from '../../utils/imageProduct';
import { Address, District, Division, Province, Ward } from '../../utils/types';
import './Order.scss';

type OrderInfo = {
  phone: string;
  address: string;
} & Address;

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const cartItems = useSelector(cartItemsSelector);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const user = useSelector(userSelector);
  const [divisions, setDivisions] = useState<Division>({
    provinces: [],
    districts: [],
    wards: [],
  });
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({} as OrderInfo);

  useEffect(() => {
    if (!user.address || !user.phone) return;
    const phone = user.phone;
    const userAddress = user.address.split(', ');
    const provinces = divisions.provinces.find(p => p.name === userAddress[3]);
    const districts = divisions.districts.find(p => p.name === userAddress[2]);
    const wards = divisions.wards.find(p => p.name === userAddress[1]);
    const address = userAddress[0];

    if (provinces && districts && wards)
      setOrderInfo({ provinces, districts, wards, address, phone });
  }, [user, divisions]);

  useEffect(() => {
    getAllDivisions()
      .then(data => {
        setDivisions(data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const validate = useMemo(() => {
    const { address, phone, provinces, districts, wards } = orderInfo;
    return address && phone && provinces && districts && wards;
  }, [orderInfo]);

  const orderItem = useMemo(() => {
    return cartItems.map(item => {
      const { size, price, quantity, _id: product } = item;
      return { size, price, quantity, product };
    });
  }, [cartItems]);

  const orderHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate) return;
    if (!cartItems.length) return;
    const { phone, address, wards, districts, provinces } = orderInfo;

    const orderAddress = [
      address,
      wards.name,
      districts.name,
      provinces.name,
    ].join(', ');

    try {
      const res = await axiosPrivate.post('orders', {
        phone,
        address: orderAddress,
        items: orderItem,
        customer: user.id,
        totalPrice,
      });
      if (res.status === 201) {
        toast.success('Order successful!!');
        dispatch(removeAllCart());
        navigate('/me/my-order');
      }
    } catch (error: any) {
      const message = error.response.data.message;
      if (message) toast.warning(message);
      console.log(error);
    }
  };

  return (
    <form className="order-page container" onSubmit={orderHandler}>
      <div className="order__form">
        <h2>{user.name}</h2>

        <FormInput
          value={orderInfo.phone}
          onChange={e => {
            setOrderInfo(prev => ({ ...prev, phone: e.target.value }));
          }}
          name="phone"
          type="text"
          errorMessage="Vui lòng nhập đúng số điện thoại!"
          label="Số điện thoại"
          pattern="^[0-9]{10}"
          required
          style={{ marginBottom: '10px' }}
        />

        {divisions && (
          <>
            <span>Nhập địa chỉ của bạn:</span>
            <Select
              className="order__form-select"
              value={orderInfo.provinces}
              options={divisions.provinces}
              getOptionLabel={(p: Province) => {
                return p.name;
              }}
              getOptionValue={(p: Province) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setOrderInfo(prev => ({
                  ...prev,
                  provinces: selectOption as Province,
                }));
              }}
              placeholder="Chọn tỉnh thành"
            />
            <Select
              className="order__form-select"
              value={orderInfo.districts}
              isDisabled={!orderInfo.provinces}
              options={
                orderInfo.provinces
                  ? (divisions.districts.filter(
                      d => d.province_code === orderInfo.provinces.code
                    ) as any)
                  : []
              }
              getOptionLabel={(p: District) => {
                return p.name;
              }}
              getOptionValue={(p: District) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setOrderInfo(prev => ({
                  ...prev,
                  districts: selectOption as District,
                }));
              }}
              placeholder="Chọn quận huyện"
            />
            <Select
              className="order__form-select"
              value={orderInfo.wards}
              isDisabled={!orderInfo.districts}
              options={
                orderInfo.districts
                  ? (divisions.wards.filter(
                      w => w.district_code === orderInfo.districts.code
                    ) as any)
                  : []
              }
              getOptionLabel={(p: Ward) => {
                return p.name;
              }}
              getOptionValue={(p: Ward) => {
                return p.code.toString();
              }}
              onChange={selectOption => {
                setOrderInfo(prev => ({
                  ...prev,
                  wards: selectOption as Ward,
                }));
              }}
              placeholder="Chọn xã phường"
            />
            <FormInput
              disabled={!orderInfo.wards}
              value={orderInfo.address}
              onChange={e => {
                setOrderInfo(prev => ({ ...prev, address: e.target.value }));
              }}
              type="text"
              label="Địa chỉ"
              required
              style={{ margin: 0 }}
            />
          </>
        )}
      </div>
      <div className="order__list">
        <div className="order__items">
          {cartItems.map((item, i) => (
            <div className="order__item" key={i}>
              <div className="order__item-l">
                <img src={imageProduct(item.imageCover)} alt="" />
                <div className="order__item-content">
                  <h4>{item.name}</h4>
                  <span>{item.size}</span>
                </div>
              </div>
              <div className="order__item-r">
                <span>x</span>
                <span>{item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h3 style={{ display: 'inline-block' }}>
            Total: <span>{currencyFormat(totalPrice)}</span>
          </h3>
        </div>
        <Button className="btn--blue order__btn" disabled={!validate}>
          Đặt hàng
        </Button>
      </div>
    </form>
  );
};
export default Order;
