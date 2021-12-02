import { React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductCount } from '../actions/actions.js';

const ProductList = (props) => {

  // global redux state
  const products = useSelector(state => state.products);
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  // local state
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Dispatches the actions upon initial load
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductCount());
    changePageCount();
  }, []);

  // Dispatches an action if the search parameters change
  useEffect(() => {
    const params = 'category=' + category + '&search=' + searchTerm + '&page=' + currentPage + '&price=' + priceSort;
    dispatch(fetchProducts(params));
    dispatch(fetchProductCount(params));

  }, [currentPage, category, searchTerm, priceSort])

  useEffect(() => {
    changePageCount()
  }, [count])

  // Takes the count (global state) and converts it into pages with 9 products each. Then calls displayPagination() to render pagination accordingly
  const changePageCount = () => {
    console.log(count);
    let pages = Math.ceil(count/9);
    setPageCount(pages);
    displayPagination();
  };

  // Uses count and products (global state) to render products to page
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
          <h2>${p.price}</h2>
        </div>
      )
    })
  };

  // Creates the page number buttons
  const displayPagination = () => {
    let pageHTML = [];
    for (let i = 1; i <= pageCount; i++) {
      pageHTML.push(<button className="btn" value={i} onClick={(e)=>handlePageClick(e)}>{i}</button>)
    };
    return pageHTML;
  }

  // Updates the currentPage (local state) when user clicks on different page #
  const handlePageClick = (e) => {
    setCurrentPage(parseInt(e.target.value));
  };

  // Updates the searchTerm (local state) when the user submits the search form
  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    setSearchTerm(e.target.search.value);
    
  };

  // Updates the price sort button text based on priceSort (local state)
  const priceSortDisplay = () => {
    if (priceSort === 'lowest') {
      return 'Low to High'
    } else if (priceSort === 'highest') {
      return 'High to Low'
    } else {
      return 'Price Sorting'
    }
  };

  // Clears the current search term input
  const handledeleteSearchInput = () => {
    setSearchTerm('');
    document.getElementById('search').value = '';
  };


  return (
    <div className="container">
      <div className="search-bar">
        
          <form onSubmit={(e) => handleSearchFormSubmit(e)}>
            <div className="form-group search">
              <input type="search" className="form-control" name="search" id="search"
              >
              </input>
              <button type="submit" className="btn">Submit Search</button>
            </div>
            <div className="search-term-input">
              <span className={searchTerm ? "current-search active" : "current-search"}>
                {searchTerm ? searchTerm : ''}
                <span className={searchTerm ? "delete display" : "delete"} onClick={handledeleteSearchInput}><strong> x</strong></span>
              </span>
              
            </div>


          </form>

            <div className="form-group search-category">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {category ? category : 'Select Category'}
                </button>
      
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" value="" onClick={(e) => setCategory(e.target.value)}>Reset</button>
                <button className="dropdown-item" value="Automotive" onClick={(e) => setCategory(e.target.value)}>Automotive</button>
                <button className="dropdown-item" value="Baby" onClick={(e) => setCategory(e.target.value)}>Baby</button>
                <button className="dropdown-item" value="Beauty" onClick={(e) => setCategory(e.target.value)}>Beauty</button>
                <button className="dropdown-item" value="Books" onClick={(e) => setCategory(e.target.value)}>Books</button>
                <button className="dropdown-item" value="Clothing" onClick={(e) => setCategory(e.target.value)}>Clothing</button>
                <button className="dropdown-item" value="Computers" onClick={(e) => setCategory(e.target.value)}>Computers</button>
                <button className="dropdown-item" value="Electronics" onClick={(e) => setCategory(e.target.value)}>Electronics</button>
                <button className="dropdown-item" value="Games" onClick={(e) => setCategory(e.target.value)}>Games</button>
                <button className="dropdown-item" value="Garden" onClick={(e) => setCategory(e.target.value)}>Garden</button>
                <button className="dropdown-item" value="Grocery" onClick={(e) => setCategory(e.target.value)}>Grocery</button>
                <button className="dropdown-item" value="Health" onClick={(e) => setCategory(e.target.value)}>Health</button>
                <button className="dropdown-item" value="Home" onClick={(e) => setCategory(e.target.value)}>Home</button>
                <button className="dropdown-item" value="Industrial" onClick={(e) => setCategory(e.target.value)}>Industrial</button>
                <button className="dropdown-item" value="Jewelery" onClick={(e) => setCategory(e.target.value)}>Jewelery</button>
                <button className="dropdown-item" value="Kids" onClick={(e) => setCategory(e.target.value)}>Kids</button>
                <button className="dropdown-item" value="Movies" onClick={(e) => setCategory(e.target.value)}>Movies</button>
                <button className="dropdown-item" value="Music" onClick={(e) => setCategory(e.target.value)}>Music</button>
                <button className="dropdown-item" value="Outdoors" onClick={(e) => setCategory(e.target.value)}>Outdoors</button>
                <button className="dropdown-item" value="Shoes" onClick={(e) => setCategory(e.target.value)}>Shoes</button>
                <button className="dropdown-item" value="Sports" onClick={(e) => setCategory(e.target.value)}>Sports</button>
                <button className="dropdown-item" value="Tools" onClick={(e) => setCategory(e.target.value)}>Tools</button>
                <button className="dropdown-item" value="Toys" onClick={(e) => setCategory(e.target.value)}>Toys</button>
              </div>
            </div>
          </div>
          <div className="dropdown price-sorting">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {priceSortDisplay()}
                </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" value="lowest" onClick={(e) => setPriceSort(e.target.value)}>Low to High</button>
                <button className="dropdown-item" value="highest" onClick={(e) => setPriceSort(e.target.value)}>High to Low</button>
          </div>
        </div>
      </div>

       
      {isNaN(count) ? <div className="no-products"><h1>Hello?</h1><h2>Anyone there?</h2></div> : <h2>There are {count} products displayed.</h2> }
      <div className="products-container">
        {displayProducts()}
      </div>
      <div id="pagination-container">
        {displayPagination()}
      </div>
  </div>
    
  )
}

export default ProductList;