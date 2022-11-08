import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../components/Pagination/Pagination';

import * as productServices from '../../services/productServices';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import './Products.scss';
import ProductsFilter from '../../components/ProductsComponent/ProductsFilter/ProductsFilter';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ProductModel } from '../../utils/types';
import { useLocation, useSearchParams } from 'react-router-dom';

export type ProductFilters = {
  category?: string;
  sizes?: string[];
  sort?: string;
};

const Products = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageActive, setPageActive] = useState<number>(1);

  useEffect(() => {
    const category = searchParams.get('category');
    const size = searchParams.getAll('size');
    const sort = searchParams.get('sort');
    setIsLoading(true);
    productServices
      .getAllProduct({
        page: pageActive,
        limit: 20,
        category,
        size,
        sort,
      })
      .then(res => {
        setIsLoading(false);
        setProducts(res.data.data);
        setTotalPages(res.totalPages);
        window.scrollTo(0, 0);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, pageActive]);

  const pageChangeHandler = useCallback((page: any) => {
    setPageActive(page.selected + 1);
  }, []);

  return (
    <main className="products ">
      {isLoading && <Spinner />}
      <ProductsFilter />
      <div>
        <div className="products__grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="products__footer">
          {!!totalPages && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              onPageChange={pageChangeHandler}
            />
          )}
        </div>
      </div>
    </main>
  );
};
export default Products;
