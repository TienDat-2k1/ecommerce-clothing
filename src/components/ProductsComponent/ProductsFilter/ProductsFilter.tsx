import { useState, useEffect } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

import * as categoryServices from '../../../services/categoryServices';
import Button from '../../UI/Button/Button';
import './ProductsFilter.scss';
import { CategoryModel } from '../../../utils/types';
import { useSearchParams } from 'react-router-dom';
import useCurrentParams from '../../../hooks/useCurrentParams';

const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const options = [
  { id: 1, name: 'Newest', value: '-createAt' },
  { id: 2, name: 'Oldest', value: 'createAt' },
  { id: 3, name: 'Best Sale', value: '-saleOff' },
  { id: 4, name: 'Name: A-Z', value: 'name' },
  { id: 5, name: 'Name: Z-A', value: '-name' },
  { id: 6, name: 'Price: Low to Hight', value: 'price' },
  { id: 7, name: 'Price: Hight to Low', value: '-price' },
];

type ProductsFilterProps = {
  changePage: (page: number) => void;
};

const ProductsFilter: React.FC<ProductsFilterProps> = ({ changePage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentParams] = useCurrentParams();
  const [isFilterToggle, setIsFilterToggle] = useState(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [expandContent, setExpandContent] = useState({
    collection: true,
    size: true,
    options: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryServices.getAllCategories();

      setCategories(res);
    };

    fetchCategories();
  }, []);

  const categoryChangeHandler = (id: string) => {
    const existingCategoryId = searchParams.get('category');

    if (existingCategoryId?.includes(id)) {
      setSearchParams({ ...currentParams, category: [] });
    } else {
      setSearchParams({ ...currentParams, category: id });
    }
    changePage(1);
  };

  const sizeChangeHandler = (size: string) => {
    const existingSize = searchParams.getAll('size');

    if (existingSize.includes(size)) {
      const newSize = existingSize.filter(s => s !== size);
      setSearchParams({
        ...currentParams,
        size: newSize,
      });
    } else {
      setSearchParams({ ...currentParams, size: [...existingSize, size] });
    }

    changePage(1);
  };

  const optionChangeHandler = (value: string) => {
    const existingOption = searchParams.get('sort');

    if (existingOption === value) {
      setSearchParams({ ...currentParams, sort: [] });
    } else {
      setSearchParams({ ...currentParams, sort: value });
    }

    changePage(1);
  };

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
              <div
                className="filter-title"
                onClick={() =>
                  setExpandContent({
                    ...expandContent,
                    collection: !expandContent.collection,
                  })
                }
              >
                <h2>Collection</h2>
                {expandContent.collection ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              <div
                className={`filter-contents ${
                  expandContent.collection ? 'expand' : ''
                }`}
              >
                {!!categories.length &&
                  categories.map(category => (
                    <div
                      key={category._id}
                      className={`filter-toggle__category ${
                        searchParams.get('category')?.includes(category._id)
                          ? 'filter-toggle__category--active'
                          : ''
                      }`}
                      onClick={() => categoryChangeHandler(category._id)}
                    >
                      <span>{category.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="filter-toggle__item">
              <div
                className="filter-title"
                onClick={() =>
                  setExpandContent({
                    ...expandContent,
                    size: !expandContent.size,
                  })
                }
              >
                <h2>Size</h2>
                {expandContent.size ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              <div
                className={`filter-contents ${
                  expandContent.size ? 'expand' : ''
                }`}
              >
                {sizes.map((size, i) => (
                  <div
                    key={i}
                    className={`filter-contents__size ${
                      searchParams.getAll('size')?.includes(size)
                        ? 'filter-contents__size--active'
                        : ''
                    }`}
                    onClick={() => sizeChangeHandler(size)}
                  >
                    <span>{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-toggle__item">
              <div
                className="filter-title"
                onClick={() =>
                  setExpandContent({
                    ...expandContent,
                    options: !expandContent.options,
                  })
                }
              >
                <h2>Options</h2>
                {expandContent.options ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              <div
                className={`filter-contents ${
                  expandContent.options ? 'expand' : ''
                }`}
              >
                {options.map((option, i) => (
                  <div
                    key={option.id}
                    className={`filter-contents__option ${
                      searchParams.get('sort') === option.value
                        ? 'filter-contents__option--active'
                        : ''
                    }`}
                    onClick={() => optionChangeHandler(option.value)}
                  >
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-toggle__item"></div>
          </div>
          <div className="filter-toggle__footer">
            <Button
              className="btn--outline btn--round filter-toggle__clear-btn"
              rightIcon={<AiOutlineClear />}
              onClick={() => setSearchParams({})}
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
