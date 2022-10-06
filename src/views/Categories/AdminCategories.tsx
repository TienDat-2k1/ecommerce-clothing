import { useState, useEffect } from 'react';
import AdminCategoryItem from '../../components/AdminCategoryItem/AdminCategoryItem';
import useDebounce from '../../hooks/useDebounce';
import { CategoryModel } from '../../Model/categoryModel';

import * as categoryServices from '../../services/categoryServices';
import './AdminCategories.scss';
import AdminCategoryHeading from './AdminCategoryHeading';

const AdminCategories = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const debounceSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryServices.getAllCategories({
        keywords: debounceSearchValue,
      });
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
      />
      <div className="admin-category__header-item row">
        <div className="col c-2"></div>
        <div className="col c-10">
          <div className="row">
            <div className="admin-category__header-block col c-2 l-3 sm-0">
              <span>Image Cover</span>
            </div>
            <div className="admin-category__header-block col c-5 l-4 sm-7">
              <span>name</span>
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
