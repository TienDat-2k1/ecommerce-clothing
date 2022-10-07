import React, { useState, useRef } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import CreateCategoryModal from '../../components/ModalComponent/CreateCategoryModal/CreateCategoryModal';

import SearchInput from '../../components/UI/SearchInput/SearchInput';

type AdminCategoryHeadingProps = {
  searchInput: string;
  searchLoading: boolean;
  onCreate: () => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const AdminCategoryHeading = ({
  searchInput,
  searchLoading,
  onCreate,
  setSearchInput,
}: AdminCategoryHeadingProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isCreateCategoryModal, setIsCreateCategoryModal] = useState(false);

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchInput('');
  };

  const inputSearchHandler = () => {
    const searchInput = searchRef?.current?.value || '';
    setSearchInput(searchInput);
  };

  const showCreateCategoryModal = () => {
    setIsCreateCategoryModal(true);
  };

  const hideCreateCategoryModal = () => {
    setIsCreateCategoryModal(false);
  };

  return (
    <>
      <div className="admin-category__header-cta">
        <IoCreateOutline
          className="admin-product-icon icon-create"
          onClick={showCreateCategoryModal}
        />

        <div className="admin-category-search">
          <SearchInput
            ref={searchRef}
            value={searchInput}
            isLoading={searchLoading}
            onSearch={inputSearchHandler}
            onChange={changeSearchHandler}
            onClear={clearSearchHandler}
            placeholder="Enter name category"
          />
        </div>
      </div>
      {isCreateCategoryModal && (
        <CreateCategoryModal
          onClose={hideCreateCategoryModal}
          onCreate={onCreate}
        />
      )}
    </>
  );
};
export default React.memo(AdminCategoryHeading);
