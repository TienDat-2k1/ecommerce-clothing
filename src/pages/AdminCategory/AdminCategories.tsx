import { useState, useEffect } from 'react';
import AdminCategoryItem from '../../components/AdminCategoryItem/AdminCategoryItem';
import useDebounce from '../../hooks/useDebounce';

import * as categoryServices from '../../services/categoryServices';
import { CategoryModel } from '../../utils/types';
import './AdminCategories.scss';
import AdminCategoryHeading from './AdminCategoryHeading';

const AdminCategories = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const debounceSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsSearchLoading(true);
      const res = await categoryServices.getAllCategories({
        keywords: debounceSearchValue,
      });
      setIsSearchLoading(false);
      setCategories(res);
      setIsCreateCategory(false);
      setIsDeleteCategory(false);
    };
    fetchCategories();
  }, [debounceSearchValue, isCreateCategory, isDeleteCategory]);

  const onCreateCategory = () => {
    setIsCreateCategory(true);
  };

  const onDeleteCategory = () => {
    setIsDeleteCategory(true);
  };

  return (
    <div className="admin-category-container">
      <AdminCategoryHeading
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onCreate={onCreateCategory}
        searchLoading={isSearchLoading}
      />
      <div className="admin-category__header-item row">
        <div className="col c-2"></div>
        <div className="col c-10">
          <div className="row">
            <div className="admin-category__header-block col c-2 l-3 sm-0">
              <span>Hình ảnh</span>
            </div>
            <div className="admin-category__header-block col c-5 l-4 sm-7">
              <span>Tên danh mục</span>
            </div>
            <div className="admin-category__header-block col c-5">
              <span>id</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-product-listitem">
        {categories &&
          categories.map(category => (
            <AdminCategoryItem
              key={category._id}
              category={category}
              onDelete={onDeleteCategory}
            />
          ))}
      </div>
    </div>
  );
};
export default AdminCategories;
