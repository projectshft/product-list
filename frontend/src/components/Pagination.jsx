import PropTypes from 'prop-types';
import { usePagination, DOTS } from '../hooks/usePagination';

const Pagination = ({ data, currentPage, onPageChange }) => {
  const totalCount = data?.count || 0;
  const pageSize = 9;
  const siblingCount = 1;
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // dynamically construct range of pagination
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="flex">
      <li className="px-2 hover:bg-slate-200 rounded-full cursor-pointer select-none" onClick={onPrevious}>
        {'<'}
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className="px-2">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={idx}
            className="px-2 hover:bg-slate-200 rounded-full cursor-pointer select-none"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className="px-2 hover:bg-slate-200 rounded-full cursor-pointer select-none" onClick={onNext}>
        {'>'}
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  data: PropTypes.object,
};

export default Pagination;
