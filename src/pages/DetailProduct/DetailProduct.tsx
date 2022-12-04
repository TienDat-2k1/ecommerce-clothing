import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as productServices from '../../services/productServices';
import { useParams } from 'react-router-dom';
import { addCart } from '../../store/cart/cartSlice';
import './DetailProduct.scss';
import Button from '../../components/UI/Button/Button';
import ImageProductSlideShow from '../../components/ImageProductSlideShow/ImageProductSlideShow';
import Spinner from '../../components/UI/Spinner/Spinner';
import { BsCart4 } from 'react-icons/bs';
import ProductReviews from './ProductReviews';
import Rating from '../../components/UI/Rating/Rating';
import { CartModel, ProductModel } from '../../utils/types';
import { currencyFormat, salePrice } from '../../utils/currencyFormat';

type OptionsCart = {
  size: string;
  color: string;
  quantity: number;
};

const DetailProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductModel>();
  const [optionsCart, setOptionsCart] = useState<OptionsCart>({
    size: '',
    color: '',
    quantity: 1,
  });

  useEffect(() => {
    const fetchProduct = async (id: string | undefined) => {
      if (!id) return;
      const result = await productServices.getProduct(id);

      setProduct(result.data);
    };
    fetchProduct(productId);
  }, [productId]);

  const sizeChangeHandler = (size: string) => {
    setOptionsCart({ ...optionsCart, size });
  };

  const increaseQuantityHandler = () => {
    setOptionsCart({ ...optionsCart, quantity: optionsCart.quantity + 1 });
  };
  const decreaseQuantityHandler = () => {
    if (optionsCart.quantity > 1) {
      setOptionsCart({ ...optionsCart, quantity: optionsCart.quantity - 1 });
    }
  };

  const addToCartHandler = (product: ProductModel) => {
    if (!optionsCart.size) return;

    const cartProductPrice = Math.round(
      product.price - (product.price * product.saleOff) / 100
    );
    const cartProduct: CartModel = {
      ...optionsCart,
      _id: productId || '',
      name: (product && product.name) || '',
      price: cartProductPrice,
      imageCover: product.imageCover,
      sizes: product.sizes,
    };

    dispatch(addCart(cartProduct));
  };

  return (
    <main className="product container">
      {!product && <Spinner />}
      {product && (
        <>
          <div className="product__main">
            {/* <div className="product__image">
                <img src={imageProduct(product.imageCover)} alt={product.name} />
              </div> */}
            <ImageProductSlideShow
              className="product__image"
              images={
                product.images
                  ? [product.imageCover, ...product.images]
                  : [product.imageCover]
              }
            />
            <div className="product__details">
              <h1 className="product__name">{product.name}</h1>
              <div className="product__rating">
                <Rating
                  count={5}
                  rating={Math.round(product.ratingsAverage)}
                  color={{ filled: '#FFBF00', unfilled: '#ccc' }}
                />
                {/* <span>{product.ratingsAverage}</span> */}
                {!!product.ratingsQuantity && (
                  <span>{product.ratingsQuantity} lượt đánh giá</span>
                )}
              </div>
              <div className="product__material">
                <h4>Chất liệu: </h4>
                <span>{product.material}</span>
              </div>

              <div className="product__price">
                {!!product.saleOff && (
                  <span className="product__price-origin">
                    ${currencyFormat(product.price)}
                  </span>
                )}
                <span className="product__price-sale">
                  {salePrice(product.price, product.saleOff)}
                </span>
                {!!product.saleOff && (
                  <div className="product__saleOff">- {product.saleOff} %</div>
                )}
              </div>
              <div className="product__size">
                <h4>Kích cỡ: </h4>
                {product.sizes.length &&
                  product.sizes.map((s, i) => (
                    <kbd
                      key={i}
                      className={optionsCart.size === s ? 'active' : ''}
                      onClick={() => sizeChangeHandler(s)}
                    >
                      {s}
                    </kbd>
                  ))}
              </div>
              {/* <div className="product__color">
                  <h4>Color: </h4>
                  <span
                    className="active"
                    style={{ backgroundColor: 'red' }}
                  ></span>
                  <span style={{ backgroundColor: 'blue' }}></span>
                </div> */}
              <div className="product__quantity">
                <h4>Số lượng:</h4>
                <span onClick={decreaseQuantityHandler}>-</span>
                <span>{optionsCart.quantity}</span>
                <span onClick={increaseQuantityHandler}>+</span>
              </div>
              <Button
                className="btn--round btn--shadow product__btn"
                onClick={() => addToCartHandler(product)}
                disabled={!optionsCart.size}
                leftIcon={<BsCart4 />}
              >
                Thêm giỏ hàng
              </Button>
            </div>
          </div>
          <div className="product__description">
            <h2>Mô tả</h2>
            <pre>{product.description}</pre>
          </div>
          <div className="product__reviews">
            <h2>Đánh giá</h2>
            <ProductReviews />
          </div>
        </>
      )}
    </main>
  );
};
export default DetailProduct;
