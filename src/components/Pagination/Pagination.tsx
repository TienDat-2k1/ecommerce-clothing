import './Pagination.scss';

import ReactPaginate from 'react-paginate';

const Pagination = () => {
  return (
    <ReactPaginate
      className="pagination"
      pageClassName="pagination__page"
      pageLinkClassName="pagination__page--link"
      activeClassName="pagination__page--active"
      disabledClassName="pagination__page--disable"
      nextClassName="pagination__page--arrow"
      previousClassName="pagination__page--arrow"
      pageCount={20}
      pageRangeDisplayed={3}
      previousLabel="<<"
      nextLabel=">>"
      breakLabel="..."
    />
  );
};
export default Pagination;
