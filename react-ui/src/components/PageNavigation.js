import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../slices/resultsSlice';

const PageNavigation = () => {
  const dispatch = useDispatch();
  const numResults = useSelector((state) => state.results.numResults);
  const perPage = 9;
  const numPages = Math.ceil(numResults / perPage);

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    dispatch(fetchProducts(page));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="›"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={numPages}
      previousLabel="‹"
      renderOnZeroPageCount={null}
      containerClassName="justify-content-center pagination"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
      disabledClassName="disabled"
    />
  );
};

export default PageNavigation;
