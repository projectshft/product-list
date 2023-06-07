import Products from './components/Products';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from './actions/productActions';
import Pagination from './components/Pagination';

const App = () => {
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleCategory = (e) => {
    e.preventDefault()
    console.log('Ctg')
    setCategory(e.target.value)
    dispatch(fetchProducts(price, e.target.value, query, currentPage));
  }

  const handlePrice = (e) => {
    e.preventDefault()
    console.log('Price')
    setPrice(e.target.value)
    dispatch(fetchProducts(e.target.value, category, query, currentPage));
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    console.log('input')
    setQuery(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(query);
    dispatch(fetchProducts(price, category, query, currentPage));
    console.log('query')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchProducts(price, category, query, page));
    console.log('page')
  }

  return (
    <div className="App justify-content-center">
      <div className="navbar container-fluid justify-content-center">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  onChange={handleInputChange}
                  required/>
                <div className="input-group-append">
                  <button className="btn btn-dark" type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-group">
              <button className="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>
              <div className="dropdown-menu" onClick={handleCategory}>
                <p className="dropdown-item">Baby</p>
                <p className="dropdown-item">Sports</p>
                <p  className="dropdown-item">Music</p>
                <p className="dropdown-item">Garden</p>
                <p className="dropdown-item">Shoes</p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group">
              <button 
               className="btn btn-dark dropdown-toggle" 
              type="button" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false">Price</button>
              <div className="dropdown-menu" onClick={handlePrice}>
                <p className="dropdown-item">Highest</p>
                <p className="dropdown-item">Lowest</p>
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