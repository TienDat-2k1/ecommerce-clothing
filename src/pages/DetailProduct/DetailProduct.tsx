import axios from 'axios';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { CartModel } from '../../Model/cartModel';
import { ProductModel } from '../../Model/productModel';
import { addCart } from '../../store/cart/cartSlice';
import './DetailProduct.scss';

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
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);

      setProduct(res.data.data.product);
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
      sizes: product.size,
    };

    console.log(cartProduct);
    dispatch(addCart(cartProduct));
  };

  return (
    <>
      {product && (
        <main className="product container">
          <div className="product__main">
            <div className="product__image">
              <img src={product.imageCover} alt="" />
            </div>
            <div className="product__details">
              <h1 className="product__name">{product.name}</h1>
              <div className="product__material">
                <span>Material: </span>
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
                <span>Size: </span>
                {product.size.map((s, i) => (
                  <kbd
                    key={i}
                    className={optionsCart.size === s ? 'active' : ''}
                    onClick={() => sizeChangeHandler(s)}
                  >
                    {s}
                  </kbd>
                ))}
                {/* <kbd className="active">S</kbd>
                <kbd>M</kbd>
                <kbd>XL</kbd>
                <kbd>XLL</kbd> */}
              </div>
              <div className="product__color">
                <span>Color: </span>
                <span
                  className="active"
                  style={{ backgroundColor: 'red' }}
                ></span>
                <span style={{ backgroundColor: 'blue' }}></span>
              </div>
              <div className="product__quantity">
                <span>Quantity:</span>
                <span onClick={decreaseQuantityHandler}>-</span>
                <span>{optionsCart.quantity}</span>
                <span onClick={increaseQuantityHandler}>+</span>
              </div>
              <button
                className="btn product__btn"
                onClick={() => addToCartHandler(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="product__description">
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              rem harum esse soluta quas placeat consequuntur eius nihil ipsam,
              porro natus recusandae repellendus assumenda, consectetur quidem
              reprehenderit et, cum sapiente?
            </p>
          </div>
        </main>
      )}
    </>
  );
};
export default DetailProduct;
