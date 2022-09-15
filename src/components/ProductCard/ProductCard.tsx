import './ProductCard.scss';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../Model/productModel';
import Products from '../../pages/Products/Products';

type ProductCardProps = {
  product: ProductModel;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const productCardClickHandler = () => {
    console.log('onclick');
    navigate(`/products/${product._id}`);
  };
  return (
    <figure className="product-card" onClick={productCardClickHandler}>
      <div className="product-card__image">
        <img src={product.imageCover} alt="" />
      </div>
      <div className="product-card__content">
        <div className="product-card__rates">
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
          <AiFillStar className="product-card__icon" />
        </div>
        <h2 className="product-card__name">{product.name}</h2>
        <div className="product-card__price">
          <span className="product-card__price-original">{`$${product.price}`}</span>
          <span className="product-card__price-sale">{`$${Math.round(
            product.price - (product.price * product.saleOff) / 100
          )}`}</span>
        </div>
      </div>
      <div className="product-card__saleOff">-{product.saleOff}%</div>
    </figure>
  );
};
export default ProductCard;
