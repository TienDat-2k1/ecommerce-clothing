import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { BiFilter } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';

import ProductCard from '../../components/Products/ProductCard/ProductCard';
import Button from '../../components/UI/Button/Button';
import { ProductModel } from '../../Model/productModel';
import './Products.scss';

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isFilterToggle, setIsFilterToggle] = useState(false);
  const [second] = useState({
    collection: true,
    size: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/products?page=1&limit=20'
      );
      setProducts(res.data.data.products);
    };
    fetchProducts();
  }, []);

  const hideFilterToggle = () => {
    setIsFilterToggle(false);
  };
  const showFilterToggle = () => {
    setIsFilterToggle(true);
  };

  return (
    <main className="products container">
      <div className="products__filters">
        <Button
          className="btn--outline products__icon"
          rightIcon={<FiFilter />}
          onClick={showFilterToggle}
        >
          Filter
        </Button>
        <Button
          className="btn--outline products__icon"
          rightIcon={<BiFilter />}
        >
          Sort
        </Button>
      </div>
      <div className="filter-toggle">
        {isFilterToggle && (
          <div className="overlay" onClick={hideFilterToggle}></div>
        )}
        <div
          className={`products__filter-toggle ${
            isFilterToggle ? 'products__filter-toggle--active' : ''
          }`}
        >
          <div className="filter-toggle__header">
            <h2>filters</h2>
            <Button leftIcon={<IoCloseOutline />} onClick={hideFilterToggle} />
          </div>
          <div className="filter-toggle__wrapper">
            <div className="filter-toggle__item">
              <div className="filter-title">
                <h2>Collection</h2>
                <BsChevronDown />
              </div>
              <div className="filter-contents">
                <Button className="btn--outline btn--round btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
              </div>
            </div>
            <div className="filter-toggle__item">
              <div className="filter-title">
                <h2>Size</h2>
                <BsChevronDown />
              </div>
              <div className="filter-contents">
                <Button className="btn--outline btn--round">S</Button>
                <Button className="btn--outline btn--round">M</Button>
                <Button className="btn--outline btn--round">L</Button>
                <Button className="btn--outline btn--round">XL</Button>
              </div>
            </div>
            <div className="filter-toggle__item"></div>
          </div>
          <div className="filter-toggle__footer">
            <Button
              className="btn--outline btn--round filter-toggle__clear-btn"
              rightIcon={<AiOutlineClear />}
            >
              Clear
            </Button>
          </div>
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
