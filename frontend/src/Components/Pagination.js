import React from 'react';

const Pagination = ({ fetchProducts }) => {
  const handleClick = () => {
    fetchProducts({ page: 4 });
  }
  return (
    <div>
      <button onClick={handleClick}>goto page 4</button>
    </div>
  );
};


export default Pagination;