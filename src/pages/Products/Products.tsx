import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import { ProductModel } from '../../Model/productModel';
import './Products.scss';
const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/products?page=1&limit=20'
      );
      setProducts(res.data.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <main className="products container">
      <div className="products__filters">
        <div className="products__filters-l">
          <label htmlFor="category-select">Category</label>
          <select
            autoComplete="value"
            name="category"
            id="category-select"
            defaultValue=""
          >
            <option value="">-- Choose a category --</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div className="products__filters-r">
          <label htmlFor="category-select">Sort by</label>
          <select
            autoComplete="value"
            name="category"
            id="category-select"
            defaultValue=""
          >
            <option value=""></option>
            <option value="dog">A to Z</option>
            <option value="cat">Cat</option>
          </select>
        </div>
      </div>
      <div className="products__grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination />
    </main>
  );
};
export default Products;
