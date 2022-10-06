import React, { useState, useRef } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import CreateCategoryModal from '../../components/ModalComponent/CreateCategoryModal/CreateCategoryModal';

import SearchInput from '../../components/UI/SearchInput/SearchInput';

type AdminCategoryHeadingProps = {
  searchInput: string;
  onCreate: () => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const AdminCategoryHeading = ({
  searchInput,
  onCreate,
  setSearchInput,
}: AdminCategoryHeadingProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isCreateCategoryModal, setIsCreateCategoryModal] = useState(false);

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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

        <SearchInput
          ref={searchRef}
          value={searchInput}
          onSearch={inputSearchHandler}
          onChange={changeSearchHandler}
        />
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
