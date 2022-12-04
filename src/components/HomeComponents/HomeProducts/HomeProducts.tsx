import React from 'react';
import { useState, useEffect } from 'react';

import * as productServices from '../../../services/productServices';
import ProductCard from '../../Products/ProductCard/ProductCard';
import './HomeProducts.scss';
import Text from '../../UI/Text/Text';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import { ProductModel } from '../../../utils/types';

const HomeProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aliasApi, setAliasApi] = useState('top-hot');
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async (path: string) => {
      const res = await productServices.getProductAlias(path);

      if (res.data) setProducts(res.data);
      setIsLoading(false);
    };
    fetchProducts(aliasApi);
  }, [aliasApi]);

  const aliasChangeHandler = (name: string) => {
    setAliasApi(name);
    setVisible(10);
  };

  const showMoreHandler = () => {
    setVisible(prev => prev + 10);
  };

  const productType = [
    { title: 'Hot', name: 'top-hot' },
    { title: 'Khuyến mãi', name: 'top-sale' },
    { title: 'Xu hướng', name: 'top-trending' },
    { title: 'Mẫu mới', name: 'top-arrival' },
  ];

  return (
    <section className="home-products container">
      <h1 className="home-products__heading">Sản phẩm của chúng tôi</h1>
      <div className="home-products__types">
        {productType.map((type, index) => {
          return (
            <Text
              as="h2"
              key={index}
              className={`home-products__type ${
                type.name === aliasApi ? 'home-products__type--active' : ''
              }`}
              name={type.name}
              onClick={() => aliasChangeHandler(type.name)}
            >
              {type.title}
            </Text>
          );
        })}
      </div>
      <div className="home-products__grid">
        {isLoading && <Spinner style={{ backgroundColor: 'transparent' }} />}
        {products &&
          !isLoading &&
          products
            .filter((_, i) => i < visible)
            .map(product => {
              return <ProductCard key={product._id} product={product} />;
            })}
      </div>
      {visible < products.length && !isLoading && (
        <Button
          to="/products"
          className="btn--outline btn--shadow home-products__btn"
          onClick={showMoreHandler}
        >
          Xem thêm
        </Button>
      )}
    </section>
  );
};
export default React.memo(HomeProducts);
