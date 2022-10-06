import { useDispatch } from 'react-redux';
import { CartModel } from '../../Model/cartModel';
import {
  addCart,
  removeItemCart,
  removeFromCart,
} from '../../store/cart/cartSlice';
import imageProduct from '../../utils/imageProduct';
import './CheckoutItem.scss';

type CheckoutItemProps = {
  item: CartModel;
};

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const dispatch = useDispatch();
  const increaseItem = (item: CartModel) => {
    const product = { ...item, quantity: 1 };
    dispatch(addCart(product));
  };

  const decreaseItem = (item: CartModel) => {
    dispatch(removeItemCart({ ...item, quantity: 1 }));
  };

  const removeFromCartHandler = (item: CartModel) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageProduct(item.imageCover)} alt="imageCover" />
      </div>
      <span className="name">{item.name}</span>
      <span>{item.size}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseItem(item)}>
          &#10094;
        </div>
        <span className="value">{item.quantity}</span>
        <div className="arrow" onClick={() => increaseItem(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">{item.price}</span>
      <div
        className="remove-button"
        onClick={() => removeFromCartHandler(item)}
      >
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
