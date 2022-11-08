import React, { useState, useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as categoryServices from '../../services/categoryServices';

import imageCategory from '../../utils/imageCategory';
import UpdateCategoryModal from '../ModalComponent/UpdateCategoryModal/UpdateCategoryModal';
import './AdminCategoryItem.scss';
import DeleteCategoryModal from '../ModalComponent/DeleteCategoryModal/DeleteCategoryModal';
import { CategoryModel } from '../../utils/types';

type AdminCategoryItemProps = {
  category: CategoryModel;
  onDelete: () => void;
};

const AdminCategoryItem = ({
  category: p,
  onDelete,
}: AdminCategoryItemProps) => {
  const [category, setCategory] = useState(p);
  const [isUpdateModalDisplay, setIsUpdateModalDisplay] = useState(false);
  const [isDeleteModalDisplay, setIsDeleteModalDisplay] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  useEffect(() => {
    try {
      const fetchCategory = async () => {
        const res = await categoryServices.getCategory(p._id);
        setCategory(res);
        setIsUpdateModal(false);
      };

      fetchCategory();
    } catch (error) {}
  }, [isUpdateModal, p]);

  const onUpdate = () => {
    setIsUpdateModal(true);
  };
  const showUpdateModal = () => {
    setIsUpdateModalDisplay(true);
  };
  const hideUpdateModal = () => {
    setIsUpdateModalDisplay(false);
  };

  const showDeleteCategoryModal = () => {
    setIsDeleteModalDisplay(true);
  };
  const hideDeleteCategoryModal = () => {
    setIsDeleteModalDisplay(false);
  };

  return (
    <>
      <div className="admin-category-item row">
        <div className="col c-2">
          <div className="row" style={{ height: '100%' }}>
            <div className="admin-category__icon col c-6">
              <GrUpdate onClick={showUpdateModal} />
            </div>
            <div className="admin-category__icon col c-6">
              <RiDeleteBin6Line onClick={showDeleteCategoryModal} />
            </div>
          </div>
        </div>
        <div className="col c-10">
          <div className="row" style={{ height: '100%' }}>
            <LazyLoadImage
              src={imageCategory(category.imageCover)}
              effect="blur"
              wrapperClassName="admin-category__content col c-2 l-3 sm-0"
            />
            {/* <div className="admin-category__content col c-2 l-3 sm-0">
              <img src={imageCategory(category.imageCover)} alt="" />
            </div> */}
            <div className="admin-category__content col c-5 l-4 sm-7">
              <h3>{category.name}</h3>
            </div>
            <div className="admin-category__content col c-5">
              <span>{category._id}</span>
            </div>
          </div>
        </div>
      </div>

      {isUpdateModalDisplay && (
        <UpdateCategoryModal
          onUpdate={onUpdate}
          category={category}
          onClose={hideUpdateModal}
        />
      )}

      {isDeleteModalDisplay && (
        <DeleteCategoryModal
          category={category}
          onClose={hideDeleteCategoryModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
};
export default React.memo(AdminCategoryItem);
