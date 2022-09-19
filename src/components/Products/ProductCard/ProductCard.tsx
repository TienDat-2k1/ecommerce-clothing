import './ProductCard.scss';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

import { ProductModel } from '../../../Model/productModel';
import ProductCardModal from '../ProductCardModal/ProductCardModal';
import { useState } from 'react';

type ProductCardProps = {
  product: ProductModel;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isCardModal, setIsCardModal] = useState(false);
  const navigate = useNavigate();
  const productCardClickHandler = () => {
    console.log('onclick');
    navigate(`/products/${product._id}`);
  };

  const showProductModal = () => {
    setIsCardModal(true);
  };

  const hideProductModal = () => {
    setIsCardModal(false);
  };

  return (
    <>
      <figure className="product-card">
        <div className="product-card__image">
          <img
            src={product.imageCover}
            alt=""
            onClick={productCardClickHandler}
          />
          <div
            className="product-card__cart f-center"
            onClick={showProductModal}
          >
            <BsCart4 />
          </div>
        </div>
        <div
          className="product-card__content"
          onClick={productCardClickHandler}
        >
          <div className="product-card__rates">
            <AiFillStar className="product-card__icon" />
            <AiFillStar className="product-card__icon" />
            <AiFillStar className="product-card__icon" />
            <AiFillStar className="product-card__icon" />
            <AiFillStar className="product-card__icon" />
          </div>
          <h2 className="product-card__name">{product.name}</h2>
          <div className="product-card__price">
            {!!product.saleOff && (
              <span className="product-card__price-original">{`$${product.price}`}</span>
            )}
            <span className="product-card__price-sale">{`$${Math.round(
              product.price - (product.price * product.saleOff) / 100
            )}`}</span>
          </div>
        </div>
        {!!product.saleOff && (
          <div className="product-card__saleOff">
            <span>-{product.saleOff}%</span>
          </div>
        )}
      </figure>

      {isCardModal && (
        <ProductCardModal product={product} onClose={hideProductModal} />
      )}
    </>
  );
};
export default ProductCard;
