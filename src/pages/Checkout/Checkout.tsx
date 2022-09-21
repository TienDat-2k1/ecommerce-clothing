import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { useAppSelector } from '../../hooks/hooks';
import './Checkout.scss';

const Checkout = () => {
  const cartItems = useAppSelector(state => state.cart.cart);
  const totalPrice = useAppSelector(state => state.cart.totalPrice);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Size</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {/* List item */}
      {cartItems &&
        cartItems.map(cartItem => {
          return (
            <CheckoutItem key={cartItem._id + cartItem.size} item={cartItem} />
          );
        })}

      <span className="total">Total: {totalPrice}$</span>
    </div>
  );
};
export default Checkout;
