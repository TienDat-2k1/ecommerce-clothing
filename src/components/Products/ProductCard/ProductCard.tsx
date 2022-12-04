import React from 'react';

import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

import ProductCardModal from '../../ModalComponent/ProductCardModal/ProductCardModal';
import { useState } from 'react';
import imageProduct from '../../../utils/imageProduct';
import Rating from '../../UI/Rating/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ProductModel } from '../../../utils/types';
import { currencyFormat, salePrice } from '../../../utils/currencyFormat';

type ProductCardProps = {
  product: ProductModel;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isCardModal, setIsCardModal] = useState(false);
  const navigate = useNavigate();
  const productCardClickHandler = () => {
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
          <LazyLoadImage
            src={imageProduct(product.imageCover)}
            onClick={productCardClickHandler}
            effect="blur"
          />
          {/* <img
            src={imageProduct(product.imageCover)}
            alt=""
            onClick={productCardClickHandler}
          /> */}
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
            <Rating
              count={5}
              rating={Math.round(product.ratingsAverage)}
              color={{ filled: '#FFBF00', unfilled: '#ccc' }}
            />
          </div>
          <h2 className="product-card__name">{product.name}</h2>
          <div className="product-card__price">
            {!!product.saleOff && (
              <span className="product-card__price-original">
                {currencyFormat(product.price)}
              </span>
            )}
            <span className="product-card__price-sale">
              {salePrice(product.price, product.saleOff)}
            </span>
            {/* <span className="product-card__price-sale">{`$${Math.round(
              product.price - (product.price * product.saleOff) / 100
            )}`}</span> */}
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
export default React.memo(ProductCard);
