import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
import { ProductModel } from '../../Model/productModel';
import Popper from '../UI/Popper/Popper';
import SearchInput from '../UI/SearchInput/SearchInput';

import * as productServices from '../../services/productServices';
import './HeaderSearch.scss';
import HeaderSearchItem from './HeaderSearchItem';
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { setKeyWords } from '../../store/search/searchSlice';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);

  const debounce = useDebounce(searchInput, 500);

  useEffect(() => {
    if (!debounce.length) return;
    setIsSearchLoading(true);
    const fetchSearchResult = async (keywords: string) => {
      const res = await productServices.getAllProduct({ keywords });

      setSearchResults(res.data.data);
      setTotalResults(res.results);
      setIsSearchLoading(false);
    };

    fetchSearchResult(debounce);
  }, [debounce]);

  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const clearSearchInputHandler = () => {
    setSearchInput('');
  };

  const clickResultHandler = (id: string) => {
    navigate(`products/${id}`);
    setSearchInput('');
  };

  const searchEnterHandler = () => {
    if (searchInput === '') return;
    navigate('/search');
    dispatch(setKeyWords(searchInput));
    setSearchInput('');
  };

  return (
    <div className="header-search">
      {/* Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.  */}
      <Tippy
        interactive
        delay={[0, 50]}
        visible={!!searchResults.length && !!searchInput.length}
        appendTo="parent"
        render={attrs => (
          <Popper className="header-search__results" {...attrs}>
            <span>Results...</span>
            {!!searchResults.length &&
              searchResults
                .filter((_, i) => i < 5)
                .map(result => (
                  <HeaderSearchItem
                    key={result._id}
                    id={result._id}
                    name={result.name}
                    imageCover={result.imageCover}
                    price={result.price}
                    onClick={() => clickResultHandler(result._id)}
                  />
                ))}
            {totalResults > 5 && (
              <div className="header-search__results-footer">
                <Button as={Link} to="/search" onClick={searchEnterHandler}>
                  View more {totalResults - 5} results
                </Button>
              </div>
            )}
          </Popper>
        )}
        onClickOutside={(instance, e) => instance.hide()}
      >
        <div>
          <SearchInput
            className="header-search__component"
            isLoading={isSearchLoading}
            value={searchInput}
            onChange={searchInputChangeHandler}
            onSearch={searchEnterHandler}
            onClear={clearSearchInputHandler}
            placeholder="Enter search..."
          />
        </div>
      </Tippy>
    </div>
  );
};
export default HeaderSearch;
