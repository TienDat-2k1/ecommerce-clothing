import { useEffect, useState, useCallback, useMemo } from 'react';
import Pagination from '../../components/Pagination/Pagination';

import * as productServices from '../../services/productServices';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import { ProductModel } from '../../Model/productModel';
import './Products.scss';
import ProductsFilter from '../../components/ProductsComponent/ProductsFilter/ProductsFilter';
import useDebounce from '../../hooks/useDebounce';
import Spinner from '../../components/UI/Spinner/Spinner';

export type ProductFilters = {
  category?: string;
  sizes?: string[];
  sort?: string;
};

const Products = () => {
  const [filters, setFilters] = useState({} as ProductFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [pageActive, setPageActive] = useState<number>(1);

  const filter = useMemo(() => {
    const obj = { ...filters };
    Object.keys(filters).forEach(el => {
      if (!filters[el as keyof ProductFilters]?.length)
        delete obj[el as keyof ProductFilters];
    });
    return obj;
  }, [filters]);

  const debounce = useDebounce(filter, 200);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async (page: number, filter: ProductFilters) => {
      const res = await productServices.getAllProduct({
        page,
        limit: 20,
        category: filter.category,
        size: filter.sizes?.join(','),
        sort: filter.sort,
      });
      setIsLoading(false);
      setProducts(res.data.data);
      setTotalPages(res.totalPages);
    };
    fetchProducts(pageActive, debounce);
  }, [pageActive, debounce]);

  const pageChangeHandler = useCallback((page: any) => {
    setPageActive(page.selected + 1);
  }, []);

  return (
    <main className="products container">
      {isLoading && <Spinner />}
      <ProductsFilter filters={filters} setFilter={setFilters} />
      <div className="products__grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="products__footer">
        {!!totalPages && (
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
