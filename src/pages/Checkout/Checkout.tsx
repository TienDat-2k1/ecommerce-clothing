import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import './Checkout.scss';

const Checkout = () => {
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
      <CheckoutItem />
      <CheckoutItem />

      <span className="total">Total: 1023$</span>
    </div>
  );
};
export default Checkout;
