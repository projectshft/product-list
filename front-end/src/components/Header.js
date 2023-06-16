import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuery, filterByCategory, sortByPrice } from "../actions";


function Header () {
  const dispatch = useDispatch();
  const productData = useSelector(state => state.products)

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    if (category !== undefined) {
      console.log('Category is now: ', category)
    }
    if (sort !== undefined) {
      console.log('Sort is now: ', sort)
    }
  }, [category, sort])
    
  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchQuery(query, category, sort))
  }

  const handleCategoryClick = (e) => {
    setCategory(e.target.innerText)
    dispatch(filterByCategory(e.target.innerText, productData.sortParam, productData.queryParam))
  }

  const handleSortClick = (e) => {
    if (e.target.innerText === 'Highest to lowest') {
      setSort('highest');
      console.log('highest? ', e.target.innerText)
      dispatch(sortByPrice('highest', category, productData.queryParam))
    }
    if (e.target.innerText === 'Lowest to highest') {
      setSort('lowest');
      dispatch(sortByPrice('lowest', category, productData.queryParam))
    }
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search" onSubmit={handleFormSubmit}>
            <input className="form-control me-2" type="search" onChange={handleQuery} placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-secondary" type="submit">Search</button>
          </form>
          <div className="container-align">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Automotive</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Baby</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Beauty</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Books</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Clothing</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Computers</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Electronics</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Games</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Garden</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Grocery</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick}href="#">Home</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick}href="#">Industrial</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Jewelery</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Kids</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Movies</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Music</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Outdoors</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Shoes</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Sports</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Tools</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Toys</a></li>
                <li><a className="dropdown-item" onClick={handleCategoryClick} href="#">Hiking</a></li>
              </ul> 
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Price
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={handleSortClick} href="#">Highest to lowest</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" onClick={handleSortClick} href="#">Lowest to highest</a></li>
              </ul>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  )
    
}

export default Header;