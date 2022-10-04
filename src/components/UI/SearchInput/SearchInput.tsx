import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import './SearchInput.scss';

type SearchInputType = {
  onSearch?: () => void;
} & React.ComponentProps<'input'>;

const SearchInput = (
  { onSearch, ...otherProps }: SearchInputType,
  ref?: React.LegacyRef<HTMLInputElement>
) => {
  return (
    <div className="search-wrapper">
      <input type="text" id="search-input" ref={ref} {...otherProps} />
      <label htmlFor="search-input" onClick={onSearch}>
        <AiOutlineSearch />
      </label>
    </div>
  );
};
export default React.forwardRef(SearchInput);
