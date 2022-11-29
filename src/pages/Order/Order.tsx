import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  cartItemsSelector,
  cartTotalPriceSelector,
} from '../../store/cart/cartSelector';
import { removeAllCart } from '../../store/cart/cartSlice';
import { userSelector } from '../../store/user/userSelector';
import imageProduct from '../../utils/imageProduct';
import './Order.scss';

const inputs = [
  {
    id: 2,
    name: 'phone',
    type: 'text',
    errorMessage: 'just number!!',
    label: 'Phone number',
    pattern: '^[0-9]{10}',
    required: true,
  },
  {
    id: 3,
    name: 'address',
    type: 'text',
    errorMessage: 'Not empty',
    label: 'Address',
    required: true,
  },
];

type OrderInput = {
  phone: string;
  address: string;
};

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [orderInput, setOrderInput] = useState<OrderInput>({
    phone: '',
    address: '',
  });
  const cartItems = useSelector(cartItemsSelector);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const user = useSelector(userSelector);

  console.log(user);

  useEffect(() => {
    user.address &&
      setOrderInput(prev => {
        return { ...prev, address: user.address as string };
      });
    user.phone &&
      setOrderInput(prev => ({ ...prev, phone: user.phone as string }));
  }, [user]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInput({ ...orderInput, [name]: value });
  };

  const validate = useMemo(() => {
    const { address, phone } = orderInput;
    return !(address && phone);
  }, [orderInput]);

  const orderItem = useMemo(() => {
    return cartItems.map(item => {
      const { size, price, quantity, _id: product } = item;
      return { size, price, quantity, product };
    });
  }, [cartItems]);

  const orderHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) return;
    if (!cartItems.length) return;

    try {
      const res = await axiosPrivate.post('orders', {
        ...orderInput,
        items: orderItem,
        customer: user.id,
        totalPrice,
      });
      if (res.status === 201) {
        toast.success('Order successful!!');
        dispatch(removeAllCart());
        navigate('/');
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
        {inputs.map(input => {
          const { id, ...inputProps } = input;
          return (
            <FormInput
              key={id}
              {...inputProps}
              value={orderInput[input.name as keyof OrderInput]}
              onChange={inputChangeHandler}
            />
          );
        })}
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
        <div>
          <h3>
            Total: <span>{totalPrice}$</span>
          </h3>
        </div>
        <Button className="btn--blue order__btn" disabled={validate}>
          Order
        </Button>
      </div>
    </form>
  );
};
export default Order;
