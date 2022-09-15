import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../../Model/productModel';
import axios from 'axios';
import ProductCard from '../../ProductCard/ProductCard';
import './HomeProducts.scss';

const HomeProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductModel[]>();

  useEffect(() => {
    const fetchProducts = async (path: string) => {
      const res = await axios.get(`http://localhost:5000/api/products/${path}`);
      setProducts(res.data.data.products);
    };
    fetchProducts('top-20-sale');
  }, []);

  return (
    <section className="home-products container">
      <h1 className="home-products__heading">Our Product</h1>
      <div className="home-products__types">
        <h2 className="home-products__type home-products__type--active">hot</h2>
        <h2 className="home-products__type ">on sale</h2>
        <h2 className="home-products__type">trending now</h2>
        <h2 className="home-products__type">new arrival</h2>
      </div>
      <div className="home-products__grid">
        {products &&
          products.map(product => {
            return <ProductCard key={product._id} product={product} />;
          })}
        {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}
      </div>
      <button
        className="btn home-products__btn"
        onClick={() => {
          navigate('/products');
        }}
      >
        Show more
      </button>
    </section>
  );
};
export default HomeProducts;
