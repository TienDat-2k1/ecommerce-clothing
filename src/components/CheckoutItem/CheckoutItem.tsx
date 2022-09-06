import './CheckoutItem.scss';

const CheckoutItem = () => {
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
        />
      </div>
      <span className="name">Áo Khoác Classic Tối Giản M9</span>
      <span className="quantity">
        <div className="arrow">&#10094;</div>
        <span className="value">1</span>
        <div className="arrow">&#10095;</div>
      </span>
      <span className="price">300</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};
export default CheckoutItem;
