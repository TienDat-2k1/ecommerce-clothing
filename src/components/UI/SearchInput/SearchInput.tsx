import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './SearchInput.scss';

type SearchInputType = {
  value: string;
  onSearch?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<'input'>;

const SearchInput = (
  { value, onSearch, onChange, ...otherProps }: SearchInputType,
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
      <label htmlFor="search-input" onClick={onSearch}>
        <AiOutlineSearch />
      </label>
    </div>
  );
};
export default React.forwardRef(SearchInput);
