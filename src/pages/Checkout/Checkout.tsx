import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import Button from '../../components/UI/Button/Button';
import { useAppSelector } from '../../hooks/hooks';
import { cartTotalItemSelector } from '../../store/cart/cartSelector';
import './Checkout.scss';
import cart_empty from '../../assets/img/cart-empty.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Checkout = () => {
  const cartItems = useAppSelector(state => state.cart.cart);
  const totalPrice = useAppSelector(state => state.cart.totalPrice);
  const totalItem = useSelector(cartTotalItemSelector);

  return (
    <>
      {totalItem === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <LazyLoadImage
            src={cart_empty}
            alt="cart empty"
            style={{ width: '800px', height: '400px', objectFit: 'cover' }}
            effect="blur"
          />
          {/* <img
            src={cart_empty}
            alt="cart empty"
            style={{ width: '800px', height: '400px', objectFit: 'cover' }}
          /> */}
        </div>
      )}
      {totalItem > 0 && (
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
            cartItems.map((cartItem: any) => {
              return (
                <CheckoutItem
                  key={cartItem._id + cartItem.size}
                  item={cartItem}
                />
              );
            })}
          <span className="total">Total: {totalPrice}$</span>
          <div className="checkout-cta">
            <Button
              as={Link}
              to="/order"
              className="btn--blue btn--shadow checkout-btn"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default Checkout;
