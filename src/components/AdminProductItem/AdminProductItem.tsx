import React, { useState, useEffect } from 'react';

import * as productServices from '../../services/productServices';
import { GrUpdate } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ProductModel } from '../../Model/productModel';
import imageProduct from '../../utils/imageProduct';
import DeleteProductModal from '../ModalComponent/DeleteProductModal/DeleteProductModal';
import UpdateProductModal from '../ModalComponent/UpdateProductModal/UpdateProductModal';
import './AdminProductItem.scss';

type AdminProductProps = {
  product: ProductModel;
  onDelete: () => void;
};

const AdminProductItem = ({ product: p, onDelete }: AdminProductProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [product, setProduct] = useState<ProductModel>(p);
  const [isDeleteProductModal, setIsDeleteProductModal] = useState(false);
  const [isUpdateProductModal, setIsUpdateProductModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      const res = await productServices.getProduct(id);

      setProduct(res.data);
    };
    fetchProduct(p._id);
    setIsUpdate(false);
  }, [isUpdate, p]);

  const showUpdateModal = () => {
    setIsUpdateProductModal(true);
  };

  const hideUpdateModal = () => {
    setIsUpdateProductModal(false);
  };

  const showDeleteModal = () => {
    setIsDeleteProductModal(true);
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteProductModal(false);
  };

  const onUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <>
      <div className="admin-product-item row">
        <div className="col c-1 md-2">
          <div className="row">
            <div className="admin-product-content admin-product-cta col c-6">
              <GrUpdate onClick={showUpdateModal} />
            </div>
            <div className="admin-product-content admin-product-cta  col c-6">
              <RiDeleteBin6Line onClick={showDeleteModal} />
            </div>
          </div>
        </div>
        <div className="col c-11 md-10">
          <div className="row">
            <div className="admin-product-content admin-product__image  col c-2 md-3">
              <img src={imageProduct(product.imageCover)} alt="" />
            </div>
            <div className="admin-product-content admin-product__name  col c-3 sm-4">
              <h4>{product.name}</h4>
            </div>
            <div className="admin-product-content col c-2 sm-0">
              <span>{product.material}</span>
            </div>
            <div className="admin-product-content admin-product__size col c-1 md-0">
              {product.sizes.map((size, i) => {
                return <span key={i}>{size}</span>;
              })}
            </div>
            <div className="admin-product-content col c-1 sm-2">
              <span>{product.saleOff}%</span>
            </div>
            <div className="admin-product-content col c-1 sm-0">
              <span>{product.ratingsAverage}</span>
            </div>
            <div className="admin-product-content col c-1 sm-0">
              <span>${product.price}</span>
            </div>
            <div className="admin-product-content col c-1 sm-3">
              <span>{product.sold}</span>
            </div>
          </div>
        </div>
      </div>
      {isDeleteProductModal && (
        <DeleteProductModal
          onClose={closeDeleteModalHandler}
          product={product}
          onDelete={onDelete}
        />
      )}
      {isUpdateProductModal && (
        <UpdateProductModal
          onClose={hideUpdateModal}
          id={product._id}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
export default React.memo(AdminProductItem);
