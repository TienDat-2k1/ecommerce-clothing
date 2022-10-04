import React, { useEffect, useRef, useState, useCallback } from 'react';
import AdminProductItem from '../../components/AdminProductItem/AdminProductItem';

import * as productServices from '../../services/productServices';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import './AdminProduct.scss';
import { ProductModel } from '../../Model/productModel';
import Pagination from '../../components/Pagination/Pagination';
import useDebounce from '../../hooks/useDebounce';

const AdminProduct = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [pageActive, setPageActive] = useState<number>(1);
  const [isDelete, setIsDelete] = useState(false);

  const debounceSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchProducts = async (page: number, keywords: string) => {
      const res = await productServices.getAllProduct({
        page,
        limit: 10,
        keywords,
      });

      setProducts(res.data.data);
      setTotalPage(res.totalPages);
      setIsDelete(false);
    };

    fetchProducts(pageActive, debounceSearchValue);
  }, [pageActive, debounceSearchValue, isDelete]);

  const inputSearchHandler = () => {
    const searchInput = searchRef?.current?.value || '';
    setSearchInput(searchInput);
  };

  const pageChangeHandler = useCallback((page: any) => {
    setPageActive(page.selected + 1);
  }, []);

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onDelete = useCallback(() => {
    setIsDelete(true);
  }, []);

  return (
    <section className="admin-product-container">
      <div className="admin-product-heading">
        <SearchInput
          ref={searchRef}
          onSearch={inputSearchHandler}
          onChange={changeSearchHandler}
          value={searchInput}
        />
      </div>
      <div className="admin-product-wrapper row">
        <div className="col c-1 md-2">
          <div className="row">
            <div className="product__header-block col c-6"></div>
            <div className="product__header-block col c-6"></div>
          </div>
        </div>
        <div className="col c-11 md-10">
          <div className="row">
            <div className="product__header-block col c-2 md-3">
              <span>Image</span>
            </div>
            <div className="product__header-block col c-3 sm-4">
              <span>Name</span>
            </div>
            <div className="product__header-block col c-2 m-2">
              <span>Material</span>
            </div>
            <div className="product__header-block col c-1 md-0">
              <span>Sizes</span>
            </div>
            <div className="product__header-block col c-1 sm-2">
              <span>Sale Off</span>
            </div>
            <div className="product__header-block col c-1 sm-0">
              <span>Rating</span>
            </div>
            <div className="product__header-block col c-1 sm-0">
              <span>Price</span>
            </div>
            <div className="product__header-block col c-1 ">
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-product-listitem">
        {products.length &&
          products.map(product => (
            <AdminProductItem
              key={product._id}
              product={product}
              onDelete={onDelete}
            />
          ))}
      </div>
      <div className="admin-product-footer">
        {totalPages && (
          <Pagination
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </div>
    </section>
  );
};
export default AdminProduct;
