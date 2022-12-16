import { useEffect, useState } from 'react';
import { buildURL } from '../helpers/buildURL';
import { useLazyGetProductsQuery } from '../services/products';
import { usePagination, DOTS } from '../hooks/usePagination';

const Pagination = ({ data, isLoading, error, currentPage, onPageChange }) => {
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

  // console.log(paginationRange)

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  console.log(totalPageCount, currentPage);

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
      <li className="px-2" onClick={onPrevious}>
        {'<'}
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="px-2">
              &#8230;
            </li>
          );
        }
        return (
          <li key={pageNumber} className="px-2" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li className="px-2" onClick={onNext}>
        {'>'}
      </li>
    </ul>
  );
};

export default Pagination;
