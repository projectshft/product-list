import Products from './components/Products';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from './actions/productActions';
import Pagination from './components/Pagination';

const App = () => {
  const [price, setPrice] = useState(null)
  const [category, setCategory] = useState(null)
  const [query, setQuery] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleCategoryClick = (e) => {
    setCategory(e.target.innerHTML)
    dispatch(fetchProducts(price, e.target.innerHTML, query, currentPage));
  }
  
  const handlePriceClick = (e) => {
    e.preventDefault()
    setPrice(e.target.innerHTML)
    dispatch(fetchProducts(e.target.innerHTML, category, query, currentPage));
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value);
  }

  const handleQuerySubmit = (e) => {
    e.preventDefault()
    setQuery(query);
    dispatch(fetchProducts(price, category, query, currentPage));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts(price, category, query, page));
  }

  return (
    <div className="App justify-content-center">
      <div className="navbar container-fluid justify-content-center">
        <div className="row">
          <div className="col-12 pe-4">
            <form onSubmit={handleQuerySubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  onChange={handleInputChange}
                  required/>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-group">
              <div className="input-group-append">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>
                <div className="dropdown-menu" onClick={handleCategoryClick}>
                  <p className="dropdown-item">Baby</p>
                  <p className="dropdown-item">Sports</p>
                  <p  className="dropdown-item">Music</p>
                  <p className="dropdown-item">Garden</p>
                  <p className="dropdown-item">Shoes</p>
                </div>
              </div>
            </div>
          </div>
        
          <div className="col-6">
            <div className="input-group">
              <div className="input-group-append">
                <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                type="button" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">Price</button>
                <div className="dropdown-menu" onClick={handlePriceClick}>
                  <p className="dropdown-item">Highest</p>
                  <p className="dropdown-item">Lowest</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Products/>
      <Pagination onChange={handlePageChange} page={currentPage}/>
    </div>
  );
}

export default App;
