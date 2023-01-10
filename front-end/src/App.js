import './App.css';
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import { useState } from 'react'
import { useSelector } from 'react-redux'


function App() {

  const [page, setPage] = useState(1);
  const total = useSelector((state) => state.total)
    const perPage = 9
    const numOfPages = Math.ceil(total / perPage)
    const pages = []
    for (let i = 1; i <= numOfPages; i++){
        pages.push(i)
    }

    const handlePageChange = (number) => {
        setPage(number)
    }

    const renderPageNumbers = () => {
       
       return pages.map(number => {
        const isCurrentPage = number === page;
        const className = isCurrentPage ? "page-number-link current" : "page-link";
        return (
            <div className="page-number-button"><span className={className}><a onClick={() => handlePageChange(number)}>{number}</a></span></div>
        )})

    }


  return (
    <div>
      <h1>Inexhaustive Merchandise Enumeration</h1>
    <SearchBar page={page} setPage={setPage}/>
    <ProductList/>
    <div className='pagination-box'>
            {renderPageNumbers()}
        </div>
    </div>
  );
}

export default App;

