import Bars from './components/Bars';
import Cards from './components/Cards';
import Pagination from './components/Pagination';
import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [query, setQuery] = useState('');

  return (
    <div>
      <Bars
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
      <Cards />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default App;
