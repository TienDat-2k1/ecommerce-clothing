import React, { useRef, useState } from 'react';

import { IoCreateOutline } from 'react-icons/io5';
import CreateProductModel from '../../components/ModalComponent/CreateProductModal/CreateProductModel';
import SearchInput from '../../components/UI/SearchInput/SearchInput';

type HeadingCtaProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeadingCta = ({
  searchInput,
  setSearchInput,
  setIsCreate,
}: HeadingCtaProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isCreateProduct, setIsCreateProduct] = useState(false);

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
        <SearchInput
          ref={searchRef}
          onSearch={inputSearchHandler}
          onChange={changeSearchHandler}
          value={searchInput}
        />
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
