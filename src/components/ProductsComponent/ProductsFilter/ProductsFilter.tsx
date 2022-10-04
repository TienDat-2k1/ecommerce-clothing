import { useState } from 'react';

import { AiOutlineClear } from 'react-icons/ai';
import { BiFilter } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Button from '../../UI/Button/Button';

const ProductsFilter = () => {
  const [isFilterToggle, setIsFilterToggle] = useState(false);

  const hideFilterToggle = () => {
    setIsFilterToggle(false);
  };
  const showFilterToggle = () => {
    setIsFilterToggle(true);
  };

  return (
    <>
      <div className="products__filters">
        <Button
          className="btn--outline products__icon"
          rightIcon={<FiFilter />}
          onClick={showFilterToggle}
        >
          Filter
        </Button>
        <Button
          className="btn--outline products__icon"
          rightIcon={<BiFilter />}
        >
          Sort
        </Button>
      </div>
      <div className="filter-toggle">
        {isFilterToggle && (
          <div className="overlay" onClick={hideFilterToggle}></div>
        )}
        <div
          className={`products__filter-toggle ${
            isFilterToggle ? 'products__filter-toggle--active' : ''
          }`}
        >
          <div className="filter-toggle__header">
            <h2>filters</h2>
            <Button leftIcon={<IoCloseOutline />} onClick={hideFilterToggle} />
          </div>
          <div className="filter-toggle__wrapper">
            <div className="filter-toggle__item">
              <div className="filter-title">
                <h2>Collection</h2>
                <BsChevronDown />
              </div>
              <div className="filter-contents">
                <Button className="btn--outline btn--round btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
                <Button className="btn--outline btn--round  btn--transparent">
                  t-shirt
                </Button>
              </div>
            </div>
            <div className="filter-toggle__item">
              <div className="filter-title">
                <h2>Size</h2>
                <BsChevronDown />
              </div>
              <div className="filter-contents">
                <Button className="btn--outline btn--round">S</Button>
                <Button className="btn--outline btn--round">M</Button>
                <Button className="btn--outline btn--round">L</Button>
                <Button className="btn--outline btn--round">XL</Button>
              </div>
            </div>
            <div className="filter-toggle__item"></div>
          </div>
          <div className="filter-toggle__footer">
            <Button
              className="btn--outline btn--round filter-toggle__clear-btn"
              rightIcon={<AiOutlineClear />}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductsFilter;
