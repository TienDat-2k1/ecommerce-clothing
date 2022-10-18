import React from 'react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsCart4 } from 'react-icons/bs';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import { ProductModel } from '../../../Model/productModel';
import { CartModel } from '../../../Model/cartModel';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../store/cart/cartSlice';
import './ProductCardModal.scss';
import ImageProductSlideShow from '../../ImageProductSlideShow/ImageProductSlideShow';
import Rating from '../../UI/Rating/Rating';

type ProductCardModalProps = {
  product: ProductModel;
  onClose: () => void;
};

const ProductCardModal = ({ product, onClose }: ProductCardModalProps) => {
  const dispatch = useDispatch();
  const [cartOptions, setCartOptions] = useState({
    size: '',
    quantity: 1,
  });

  const productPriceSale = Math.round(
    product.price - (product.price * product.saleOff) / 100
  );

  const sizeChangeHandler = (size: string) => {
    setCartOptions({ ...cartOptions, size });
  };

  const increaseQuantityHandler = () => {
    setCartOptions({ ...cartOptions, quantity: cartOptions.quantity + 1 });
  };

  const decreaseQuantityHandler = () => {
    if (cartOptions.quantity === 1) return;
    setCartOptions({ ...cartOptions, quantity: cartOptions.quantity - 1 });
  };

  const addToCartHandler = (product: ProductModel) => {
    const cartProduct: CartModel = {
      ...cartOptions,
      _id: product._id,
      name: product.name,
      imageCover: product.imageCover,
      sizes: product.sizes,
      price: productPriceSale,
    };

    dispatch(addCart(cartProduct));
  };
  return (
    <Modal onClose={onClose} className="product-modal">
      <div className="content">
        <ImageProductSlideShow
          className="product-modal__images"
          images={
            product.images
              ? [product.imageCover, ...product.images]
              : [product.imageCover]
          }
        />
        <div className="product-modal__contents">
          <h2 className="product-modal__title">{product.name}</h2>
          <div className="product-modal__rating">
            <Rating
              count={5}
              rating={Math.round(product.ratingsAverage)}
              color={{ filled: '#FFBF00', unfilled: '#ccc' }}
            />
          </div>
          <div className="product-modal__material">
            <h4>Material:</h4>
            <span>{product.material}</span>
          </div>
          <div className="product-modal__price">
            {!!product.saleOff && (
              <span className="product-modal__price--original">
                ${product.price}
              </span>
            )}
            <span className="product-modal__price--sale">
              ${productPriceSale}
            </span>
            {!!product.saleOff && (
              <span className="product-modal__price--saleOff">
                -{product.saleOff}%
              </span>
            )}
          </div>
          <div className="product-modal__sizes">
            <h4>Size:</h4>
            {product.sizes.map((sz, i) => (
              <kbd
                key={i}
                className={cartOptions.size === sz ? 'active' : ''}
                onClick={() => sizeChangeHandler(sz)}
              >
                {sz}
              </kbd>
            ))}
          </div>
          <div className="product-modal__colors"></div>
          <div className="product-modal__quantity">
            <h4>Quantity:</h4>
            <span onClick={decreaseQuantityHandler}>-</span>
            <span>{cartOptions.quantity}</span>
            <span onClick={increaseQuantityHandler}>+</span>
          </div>
          <div className="product-modal__actions">
            <Button
              className="btn--orange btn--round product-modal__btn"
              leftIcon={<BsCart4 />}
              onClick={() => addToCartHandler(product)}
              disabled={!cartOptions.size}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="close" onClick={onClose}>
        <IoClose />
      </div>
    </Modal>
  );
};
export default React.memo(ProductCardModal);
