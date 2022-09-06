import './ProductCard.scss';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
  const navigate = useNavigate();
  const productCardClickHandler = () => {
    console.log('onclick');
    navigate('/products/n');
  };
  return (
    <figure className="product-card" onClick={productCardClickHandler}>
      <div className="product-card__image">
        <img
          src="https://images.unsplash.com/photo-1608753088972-14d0514ac678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&q=80"
          alt=""
        />
      </div>
      <div className="product-card__content">
        <div className="product-card__rates">
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
        </div>
        <h2 className="product-card__name">Pastel Long Sleeve</h2>
        <div className="product-card__price">
          <span className="product-card__price-normal">$220</span>
          <span className="product-card__price-sale">$140</span>
        </div>
      </div>
    </figure>
  );
};
export default ProductCard;
