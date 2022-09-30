import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductModel } from '../../../Model/productModel';
import axios from 'axios';
import ProductCard from '../../Products/ProductCard/ProductCard';
import './HomeProducts.scss';
import Text from '../../UI/Text/Text';
import Button from '../../UI/Button/Button';

const HomeProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>();
  const [aliasApi, setAliasApi] = useState('top-hot');

  useEffect(() => {
    const fetchProducts = async (path: string) => {
      const res = await axios.get(`http://localhost:5000/api/products/${path}`);
      setProducts(res.data.data.products);
    };
    fetchProducts(aliasApi);
  }, [aliasApi]);

  const productType = [
    { title: 'hot', name: 'top-hot' },
    { title: 'on sale', name: 'top-sale' },
    { title: 'trending now', name: 'top-trending' },
    { title: 'new arrival', name: 'top-arrival' },
  ];

  return (
    <section className="home-products container">
      <h1 className="home-products__heading">Our Product</h1>
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
              onClick={() => setAliasApi(type.name)}
            >
              {type.title}
            </Text>
          );
        })}
      </div>
      <div className="home-products__grid">
        {products &&
          products.map(product => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
      <Button
        as={Link}
        to="/products"
        className="btn--outline btn--shadow home-products__btn"
      >
        Show more
      </Button>
    </section>
  );
};
export default HomeProducts;
