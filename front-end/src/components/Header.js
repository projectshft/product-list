import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions";


function Header () {

  const products = useSelector((state) => state.products);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  console.log('state.products: ', products.products[0].products);
  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchProducts(query))
    console.log('products state: ', products)
  }
  // const handleDropdownClick = () => {
  //   return false;
  // }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search" onSubmit={handleFormSubmit}>
            <input class="form-control me-2" type="search" onChange={handleQuery} placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </form>
          <div className="container-align">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Automotive</a></li>
                <li><a class="dropdown-item" href="#">Baby</a></li>
                <li><a class="dropdown-item" href="#">Beauty</a></li>
                <li><a class="dropdown-item" href="#">Books</a></li>
                <li><a class="dropdown-item" href="#">Clothing</a></li>
                <li><a class="dropdown-item" href="#">Computers</a></li>
                <li><a class="dropdown-item" href="#">Electronics</a></li>
                <li><a class="dropdown-item" href="#">Games</a></li>
                <li><a class="dropdown-item" href="#">Garden</a></li>
                <li><a class="dropdown-item" href="#">Grocery</a></li>
                <li><a class="dropdown-item" href="#">Home</a></li>
                <li><a class="dropdown-item" href="#">Industrial</a></li>
                <li><a class="dropdown-item" href="#">Jewelery</a></li>
                <li><a class="dropdown-item" href="#">Kids</a></li>
                <li><a class="dropdown-item" href="#">Movies</a></li>
                <li><a class="dropdown-item" href="#">Music</a></li>
                <li><a class="dropdown-item" href="#">Outdoors</a></li>
                <li><a class="dropdown-item" href="#">Shoes</a></li>
                <li><a class="dropdown-item" href="#">Sports</a></li>
                <li><a class="dropdown-item" href="#">Tools</a></li>
                <li><a class="dropdown-item" href="#">Toys</a></li>
                <li><a class="dropdown-item" href="#">hiking</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Price
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Highest to lowest</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Lowest to highest</a></li>
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