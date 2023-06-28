import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions";
import { useState } from "react";
import { useEffect } from "react";

const SearchBar = () => {
  // set state for query, category, price, and page data
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("1");
  
  const dispatch = useDispatch();

  // useEffect to render products data upon initial loading of the page and any time page, query, category, or price state variables are updated
  useEffect(() => {
    dispatch(fetchProducts(page, query, category, price));
  }, [page, query, category, price]);

  // setting query based on what query was typed into the input and entered
  const handleQuerySubmit = e => {
    e.preventDefault();

    setQuery(e.target[0].value);
    setPage("1");

    e.target[0].value = "";  
  };

  // setting category based on what category was selected from the dropdown
  const handleCatSelect = e => {
    if (e.currentTarget.value !== "Sort By Category") {
      setCategory(e.currentTarget.value);
      setPage("1");
    } else {
      setCategory("");
    };
  };

  // setting price sort based on sorting method selected from the dropdown
  const handlePriceSelect = e => {
    if (e.currentTarget.value === "Sort By Price") {
      setPrice("");
    } else if (e.currentTarget.value === "Highest to Lowest") {
      setPrice("highest");
    } else if (e.currentTarget.value === "Lowest to Highest") {
      setPrice("lowest");
    } else {
      console.log("Something went wrong while setting the price sort.")
    };    
  };

  // setting up pagination info. 
  const count = useSelector((state) => state.count);
  const perPage = 9;
  const pagesNeeded = Math.ceil(count / perPage);
  const pagesArr = [];

  // pushes a number for each page needed to the array
  for (let i = 1; i < pagesNeeded + 1; i++) {
    pagesArr.push(i);
  };

  // sets page state variable when a specific page number is clicked in the pagination bar
  const handlePageClick = e => {
    setPage(e.currentTarget.innerText);
  };

  // sets page state variable to minus 1 of the current page to go to the previous page of results
  const handlePreviousClick = () => {
    if (page > 1 && page < pagesNeeded + 1) {
      setPage(parseInt(page) - 1);
    };
  };

  // sets page state variable to plue 1 of the current page to go to the next page of results
  const handleNextClick = () => {
    if (page > 0 && page < pagesNeeded) {
      setPage(parseInt(page) + 1);
    };
  };

  // renders pagination display dependent on the pagesArr
  const renderPagination = () => {
    return pagesArr.map((num, i) => {
      return (
        <li className="page-item" key={i}><button className="page-link" onClick={handlePageClick}>{num}</button></li>
      );
    });
  };

  return (
    <div>
      <form className='container row' onSubmit={handleQuerySubmit}>
        <div className='form-group'>
          <label className='form-label'>Search Products</label>
        </div>
        <div className='mb-3 row'>
          <div className='col-md-6'>
            <input className='form-control' type='text' placeholder='Search'></input>
          </div>
          <div className='col-md-3'>
            <select className='form-select' defaultValue="Sort By Category" onChange={handleCatSelect}>
              <option>Sort By Category</option>
              <option>Automotive</option>
              <option>Baby</option>
              <option>Beauty</option>
              <option>Clothing</option>
              <option>Computers</option>
              <option>Electronics</option>
              <option>Games</option>
              <option>Garden</option>
              <option>Grocery</option>
              <option>Health</option>
              <option>Jewelery</option>
              <option>Kids</option>
              <option>Movies</option>
              <option>Music</option>
              <option>Shoes</option>
              <option>Sports</option>
              <option>Tools</option>
              <option>Toys</option>
              <option>Outdoors</option>
            </select>
          </div>
          <div className='col-md-3'>
            <select className='form-select' defaultValue="Sort By Price" onChange={handlePriceSelect}>
              <option>Sort By Price</option>
              <option>Highest to Lowest</option>
              <option>Lowest to Highest</option>
            </select>
          </div>
        </div>
        <hr />
      </form>
      <div className="container row">
        <nav aria-label="Search results pages" className="col">
          <ul className="pagination">
            <li className="page-item"><button onClick={handlePreviousClick} className="page-link">Previous</button></li>
            {renderPagination()}
            <li className="page-item"><button onClick={handleNextClick} className="page-link">Next</button></li>
          </ul>
        </nav>
        <div className="col page-count">Page: {page} of {pagesNeeded}</div>
      </div>
    </div>
  );
};


export default SearchBar;