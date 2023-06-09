import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions";


function Header () {
  const dispatch = useDispatch();
  
  
  const [query, setQuery] = useState('');
  
    
    
    const handleQuery = (e) => {
      e.preventDefault();
      setQuery(e.target.value)
    }
    const handleFormSubmit = (e) => {
      e.preventDefault()
      dispatch(fetchProducts(query))
    
    }
    // const handleDropdownClick = () => {
    //   return false;
    // }
  
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
                  <li><a className="dropdown-item" href="#">Automotive</a></li>
                  <li><a className="dropdown-item" href="#">Baby</a></li>
                  <li><a className="dropdown-item" href="#">Beauty</a></li>
                  <li><a className="dropdown-item" href="#">Books</a></li>
                  <li><a className="dropdown-item" href="#">Clothing</a></li>
                  <li><a className="dropdown-item" href="#">Computers</a></li>
                  <li><a className="dropdown-item" href="#">Electronics</a></li>
                  <li><a className="dropdown-item" href="#">Games</a></li>
                  <li><a className="dropdown-item" href="#">Garden</a></li>
                  <li><a className="dropdown-item" href="#">Grocery</a></li>
                  <li><a className="dropdown-item" href="#">Home</a></li>
                  <li><a className="dropdown-item" href="#">Industrial</a></li>
                  <li><a className="dropdown-item" href="#">Jewelery</a></li>
                  <li><a className="dropdown-item" href="#">Kids</a></li>
                  <li><a className="dropdown-item" href="#">Movies</a></li>
                  <li><a className="dropdown-item" href="#">Music</a></li>
                  <li><a className="dropdown-item" href="#">Outdoors</a></li>
                  <li><a className="dropdown-item" href="#">Shoes</a></li>
                  <li><a className="dropdown-item" href="#">Sports</a></li>
                  <li><a className="dropdown-item" href="#">Tools</a></li>
                  <li><a className="dropdown-item" href="#">Toys</a></li>
                  <li><a className="dropdown-item" href="#">hiking</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Price
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Highest to lowest</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Lowest to highest</a></li>
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