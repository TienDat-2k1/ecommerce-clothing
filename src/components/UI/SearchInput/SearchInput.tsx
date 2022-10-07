import React, { useState, useEffect } from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineSearch,
} from 'react-icons/ai';

import './SearchInput.scss';

type SearchInputType = {
  value: string;
  isLoading?: boolean;
  onSearch?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
} & React.ComponentProps<'input'>;

const SearchInput = (
  {
    value,
    isLoading,
    onSearch,
    onChange,
    onClear,
    ...otherProps
  }: SearchInputType,
  ref?: React.LegacyRef<HTMLInputElement>
) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        id="search-input"
        ref={ref}
        {...otherProps}
        onChange={onChange}
        value={value}
      />
      {!!value.length && !isLoading && (
        <AiOutlineCloseCircle className="search-clear" onClick={onClear} />
      )}
      {isLoading && <AiOutlineLoading3Quarters className="search-loading" />}
      <div>
        <label htmlFor="search-input" onClick={onSearch}>
          <AiOutlineSearch />
        </label>
      </div>
    </div>
  );
};
export default React.forwardRef(SearchInput);
