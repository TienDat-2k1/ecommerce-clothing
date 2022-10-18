import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ProductModel } from '../../Model/productModel';

import * as productServices from '../../services/productServices';
import { keywordsSelector } from '../../store/search/searchSelector';
import './Search.scss';

const Search = () => {
  const [results, setResults] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageActive, setPageActive] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const keywords = useSelector(keywordsSelector);

  useEffect(() => {
    setIsLoading(true);
    const fetchResults = async (keywords: string, page: number) => {
      const res = await productServices.getAllProduct({
        keywords,
        page,
        limit: 20,
      });
      setResults(res.data.data);
      setTotalPages(res.totalPages);
      setIsLoading(false);
    };

    fetchResults(keywords, pageActive);
  }, [keywords, pageActive]);

  const pageChangeHandler = (page: any) => {
    setPageActive(page.selected + 1);
  };

  return (
    <main className="search-page container">
      {isLoading && <Spinner />}
      <div className="search-heading">
        <h2>
          Result for <span>{keywords}</span>...
        </h2>
      </div>
      <div className="search-result-grid">
        {!!results.length &&
          results.map(result => (
            <ProductCard key={result._id} product={result} />
          ))}
      </div>
      {!!totalPages && totalPages !== 1 && (
        <div className="search-result-pagination">
          <Pagination
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        </div>
      )}
      {!results.length && (
        <div className="search-notfound">
          <p>No relevant results were found</p>
        </div>
      )}
    </main>
  );
};
export default Search;
