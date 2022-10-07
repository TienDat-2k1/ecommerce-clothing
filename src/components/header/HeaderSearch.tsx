import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
import { ProductModel } from '../../Model/productModel';
import Popper from '../Popper/Popper';
import SearchInput from '../UI/SearchInput/SearchInput';

import * as productServices from '../../services/productServices';
import './HeaderSearch.scss';
import HeaderSearchItem from './HeaderSearchItem';
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);

  const debounce = useDebounce(searchInput, 500);

  useEffect(() => {
    if (!debounce.length) return;
    const fetchSearchResult = async (keywords: string) => {
      const res = await productServices.getAllProduct({ keywords });

      setSearchResults(res.data.data);
      setTotalResults(res.results);
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
    setSearchResults([]);
    navigate(`products/${id}`);
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
              <div>
                <Button as={Link} to="/products">
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
            onChange={searchInputChangeHandler}
            value={searchInput}
            onClear={clearSearchInputHandler}
            placeholder="Enter search..."
          />
        </div>
      </Tippy>
    </div>
  );
};
export default HeaderSearch;
