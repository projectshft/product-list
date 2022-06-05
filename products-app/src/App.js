import Search from './components/Search';
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown.js'
import './App.css';
import { useState } from 'react';


function App() {
  const [pageNum, setPageNum] = useState(1)
  const [pagesNum, setPagesNum] = useState(10)

  const handlePagesChange = (num) => {
    setPagesNum(num)
  }

  const handlePageChange = (num) => {
    setPageNum(num)
  }
  
  return (
    <div id="products" className="App">
      <br />
      <Search setPages={handlePagesChange} setPage={handlePageChange} />
      <br />
      <Main pageNum={pageNum} pagesNum={pagesNum} setPages={handlePagesChange} setPage={handlePageChange} />
      <br />
    </div>
  );
}

export default App;
