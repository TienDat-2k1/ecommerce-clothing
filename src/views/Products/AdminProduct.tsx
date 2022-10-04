import { useRef } from 'react';
import AdminProductItem from '../../components/AdminProductItem/AdminProductItem';

import SearchInput from '../../components/UI/SearchInput/SearchInput';
import './AdminProduct.scss';

const AdminProduct = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <section className="admin-product-container">
      <SearchInput ref={searchRef} />
      <div className="admin-product-wrapper row">
        <div className="col c-1">
          <div className="row">
            <div className="product__header-block col c-6"></div>
            <div className="product__header-block col c-6"></div>
          </div>
        </div>
        <div className="col c-11">
          <div className="row">
            <div className="product__header-block col c-2">
              <span>Image</span>
            </div>
            <div className="product__header-block col c-3">
              <span>Name</span>
            </div>
            <div className="product__header-block col c-1 m-2">
              <span>Material</span>
            </div>
            <div className="product__header-block col c-2 m-1">
              <span>Sizes</span>
            </div>
            <div className="product__header-block col c-1">
              <span>Sale Off</span>
            </div>
            <div className="product__header-block col c-1 m-0">
              <span>Rating</span>
            </div>
            <div className="product__header-block col c-1">
              <span>Price</span>
            </div>
            <div className="product__header-block col c-1">
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>
      {/* Listitem */}
      <div className="admin-product-listitem">
        <AdminProductItem />
        <AdminProductItem />
      </div>
      {/* <div className="admin-product-listitem">
        <AdminProductItem />
        <AdminProductItem />
        <AdminProductItem />
        <AdminProductItem />
        <AdminProductItem />
        <AdminProductItem />
      </div> */}
    </section>
  );
};
export default AdminProduct;
