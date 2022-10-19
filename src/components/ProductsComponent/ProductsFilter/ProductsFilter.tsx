import { useState, useEffect } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

import * as categoryServices from '../../../services/categoryServices';
import { CategoryModel } from '../../../Model/categoryModel';
import Button from '../../UI/Button/Button';
import './ProductsFilter.scss';
import { ProductFilters } from '../../../pages/Products/Products';

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
  filters: ProductFilters;
  setFilter: React.Dispatch<React.SetStateAction<ProductFilters>>;
};

const ProductsFilter = ({ filters, setFilter }: ProductsFilterProps) => {
  const [isFilterToggle, setIsFilterToggle] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [expandContent, setExpandContent] = useState({
    collection: false,
    size: false,
    options: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryServices.getAllCategories();

      setCategories(res);
    };

    fetchCategories();
  }, []);

  const categoryChangeHandler = (id: string) => {
    setFilter(pre => {
      if (pre.category === id) return { ...filters, category: '' };
      return { ...filters, category: id };
    });
  };
  const sizeChangeHandler = (size: string) => {
    setFilter(pre => {
      if (!pre.sizes?.length) return { ...pre, sizes: [size] };

      if (pre.sizes?.includes(size))
        return { ...pre, sizes: pre?.sizes.filter(s => s !== size) };

      return { ...pre, sizes: [...pre?.sizes, size] };
    });
  };

  const optionChangeHandler = (value: string) => {
    setFilter(prev => {
      if (prev.sort === value) return { ...prev, sort: '' };
      return { ...prev, sort: value };
    });
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
                        filters.category === category._id
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
                      filters.sizes?.includes(size)
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
                      option.value === filters.sort
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
              onClick={() => setFilter({} as ProductFilters)}
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
