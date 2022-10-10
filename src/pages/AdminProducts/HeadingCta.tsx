import React, { useRef, useState } from 'react';

import { IoCreateOutline } from 'react-icons/io5';
import CreateProductModel from '../../components/ModalComponent/CreateProductModal/CreateProductModel';
import SearchInput from '../../components/UI/SearchInput/SearchInput';

type HeadingCtaProps = {
  searchInput: string;
  searchLoading: boolean;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeadingCta = ({
  searchInput,
  searchLoading,
  setSearchInput,
  setIsCreate,
}: HeadingCtaProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isCreateProduct, setIsCreateProduct] = useState(false);

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

  const showCreateProductModal = () => {
    setIsCreateProduct(true);
  };

  const hideCreateProductModal = () => {
    setIsCreateProduct(false);
  };

  return (
    <>
      <div className="admin-product-heading">
        <IoCreateOutline
          className="admin-product-icon icon-create"
          onClick={showCreateProductModal}
        />
        <div className="admin-product-search">
          <SearchInput
            ref={searchRef}
            isLoading={searchLoading}
            onSearch={inputSearchHandler}
            onChange={changeSearchHandler}
            onClear={clearSearchHandler}
            value={searchInput}
            placeholder="Enter product name"
          />
        </div>
      </div>
      {isCreateProduct && (
        <CreateProductModel
          onClose={hideCreateProductModal}
          setIsCreate={setIsCreate}
        />
      )}
    </>
  );
};
export default React.memo(HeadingCta);
