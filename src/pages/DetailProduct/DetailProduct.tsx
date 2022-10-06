import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as productServices from '../../services/productServices';
import { useParams } from 'react-router-dom';
import { CartModel } from '../../Model/cartModel';
import { ProductModel } from '../../Model/productModel';
import { addCart } from '../../store/cart/cartSlice';
import './DetailProduct.scss';
import Button from '../../components/UI/Button/Button';
import ImageProductSlideShow from '../../components/ImageProductSlideShow/ImageProductSlideShow';
import Spinner from '../../components/Spinner/Spinner';

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
    window.scrollTo(0, 0);

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

    console.log(cartProduct);
    dispatch(addCart(cartProduct));
  };

  return (
    <>
      {!product && <Spinner />}
      {product && (
        <main className="product container">
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
              <div className="product__material">
                <h4>Material: </h4>
                <span>{product.material}</span>
              </div>
              <div className="product__price">
                {!!product.saleOff && (
                  <span className="product__price-origin">
                    ${product.price}
                  </span>
                )}
                <span className="product__price-sale">
                  $
                  {Math.round(
                    product.price - (product.price * product.saleOff) / 100
                  )}
                </span>
                {!!product.saleOff && (
                  <div className="product__saleOff">- {product.saleOff} %</div>
                )}
              </div>
              <div className="product__size">
                <h4>Size: </h4>
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
                <h4>Quantity:</h4>
                <span onClick={decreaseQuantityHandler}>-</span>
                <span>{optionsCart.quantity}</span>
                <span onClick={increaseQuantityHandler}>+</span>
              </div>
              <Button
                className="btn--round btn--shadow product__btn"
                onClick={() => addToCartHandler(product)}
                disabled={!optionsCart.size}
              >
                Add to cart
              </Button>
            </div>
          </div>
          <div className="product__description">
            <h2>Description</h2>
            <pre>{product.description}</pre>
          </div>
        </main>
      )}
    </>
  );
};
export default DetailProduct;
