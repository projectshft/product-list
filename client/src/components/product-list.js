import { React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductCount } from '../actions/actions.js';
import { Link } from "react-router-dom";



const ProductList = (props) => {

  // overarching redux state
  const products = useSelector(state => state.products);
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  // local state
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Create local state - currentPage, setCurrentPage
  // Create local state - pageCount, setPageCount
  // If user clicks on different page number, it setsCurrentPage . -> calls useEffect which dispatches fetchProducts(params)

  // dispatches the actions upon initial load
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductCount());
  }, [dispatch]);

  // dispatches an action if the search parameters change
  useEffect(() => {
    const params = 'category=' + category + '&search=' + searchTerm;
    console.log(params);
    dispatch(fetchProducts(params));
    dispatch(fetchProductCount(params));

  }, [category, searchTerm])

  // dispatches an action if the currentPage changes
  const displayProducts = () => {
    if (isNaN(count)) {
      return (
        <div>
          <h1>Sorry, no products matched your search.</h1>
        </div>
      )
    }
    return products.map(p => {
      return (
        <div className="product-card" key={p.name}>
          <img src={p.image} alt="product"></img>
          <h1>{p.name}</h1>
        </div>
      )
    })
  };

  const displayPagination = () => {
    const pages = Math.ceil(count/9);
    console.log(pages);
    // let pageLinks;
    // for (let i=1; i++; i<=pages) {
    //   pageLinks += '<a href="google.com">Page ' + i + '</a>'
    // };

    // document.getElementById('#pagination-container').append(pageLinks);
  }

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    setSearchTerm(e.target.search.value);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <div className="col">
          <form onSubmit={(e) => handleSearchFormSubmit(e)}>
            <div className="form-group search">
              <input type="search" className="form-control" name="search" id="search"
              >
              </input>
              <button type="submit" className="btn">Submit Search</button>
            </div>
          </form>
            <div className="form-group search-category">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Category
                </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" value="" onClick={(e) => setCategory(e.target.value)}>Reset</button>
                <button className="dropdown-item" value="Tools" onClick={(e) => setCategory(e.target.value)}>Tools</button>
                <button className="dropdown-item" value="Home" onClick={(e) => setCategory(e.target.value)}>Home</button>
                <button className="dropdown-item" value="Garden" onClick={(e) => setCategory(e.target.value)}>Garden</button>
                <button className="dropdown-item" value="Clothing" onClick={(e) => setCategory(e.target.value)}>Clothing</button>
              </div>
            </div>
          </div>
        </div>
       


      </div>
      {isNaN(count) ? <div className="no-products"><h1>Hello?</h1><h2>Anyone there?</h2></div> : <h2>There are {count} products displayed.</h2> }
      <div className="products-container">
        {displayProducts()}
      </div>
      <div id="pagination-container">
        {/* TODO - {displayPagination()} */}
      </div>
    </div>
    
  )
}

export default ProductList;