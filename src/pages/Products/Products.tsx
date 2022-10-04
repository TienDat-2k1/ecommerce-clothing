import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../components/Pagination/Pagination';

import * as productServices from '../../services/productServices';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import { ProductModel } from '../../Model/productModel';
import './Products.scss';
import ProductsFilter from '../../components/ProductsComponent/ProductsFilter/ProductsFilter';

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageActive, setPageActive] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      const res = await productServices.getAllProduct({
        page,
        limit: 20,
      });

      console.log(res);

      setProducts(res.data.data);
      setTotalPages(res.totalPages);
    };
    fetchProducts(pageActive);
  }, [pageActive]);

  const pageChangeHandler = useCallback((page: any) => {
    setPageActive(page.selected + 1);
  }, []);

  return (
    <main className="products container">
      <ProductsFilter />
      <div className="products__grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="products__footer">
        {totalPages && (
          <Pagination
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </div>
    </main>
  );
};
export default Products;
