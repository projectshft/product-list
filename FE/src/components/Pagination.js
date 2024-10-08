import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/productsSlice';

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.products.currentPage);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
