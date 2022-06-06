import Search from './components/Search';
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown.js'
import './App.css';
import { useState } from 'react';


function App() {
  const [pageNum, setPageNum] = useState(1);
  const [pagesNum, setPagesNum] = useState(10);
  const [currentCat, setCategory] = useState("");
  const [priceSort, setPrice] = useState("");
  const [query, setQuery] = useState("");

  const handlePagesChange = (num) => {
    setPagesNum(num)
  };

  const handlePageChange = (num) => {
    setPageNum(num)
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handlePriceSort = (price) => {
    setPrice(price);
  };

  const handleQueryChange = (query) => {
    setQuery(query);
  }
  
  return (
    <div id="products" className="App">
      <br />
      <Search setPages={handlePagesChange} setPage={handlePageChange} setCat={handleCategoryChange} category={currentCat} setPrice={handlePriceSort} price={priceSort} setQuery={handleQueryChange} query={query} />
      <br />
      <Main pageNum={pageNum} pagesNum={pagesNum} setPages={handlePagesChange} setPage={handlePageChange} setQuery={handleQueryChange} query={query} />
      <br />
    </div>
  );
}

export default App;
