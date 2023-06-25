import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { fetchProducts } from "../actions";
import { useState } from "react";
import { useEffect } from "react";



const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("1");
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, query, category, price));
  }, [page, query, category, price]);

  const handleQuerySubmit = e => {
    if (e.key === "Enter") {
      setQuery(e.currentTarget.value);
      setPage("1");
    };
  };

  const handleCatSelect = e => {
    if (e.currentTarget.value !== "Sort By Category") {
      setCategory(e.currentTarget.value);
      setPage("1");
    } else {
      setCategory("");
    };
  };

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

  const count = useSelector((state) => state.count);
  const perPage = 9;
  const pagesNeeded = Math.ceil(count / perPage);
  const pagesArr = [];

  for (let i = 1; i < pagesNeeded + 1; i++) {
    pagesArr.push(i);
  };

  const handlePageClick = e => {
    setPage(e.currentTarget.innerText);
  };

  const handlePreviousClick = () => {
    setPage(parseInt(page) - 1);
  };

  const handleNextClick = () => {
    setPage(parseInt(page) + 1);
  };

  const renderPagination = () => {
    return pagesArr.map((num, i) => {

      return (
        <li className="page-item" key={i}><button className="page-link" onClick={handlePageClick}>{num}</button></li>
      );
    });
  };



  return (
    <div>
    <form className='container row'>
      <div className='form-group'>
        <label className='form-label'>Search Products</label>
      </div>
      <div className='mb-3 row'>
        <div className='col-md-6'>
          <input className='form-control' type='text' placeholder='Search' onKeyUp={handleQuerySubmit}></input>
        </div>
        <div className='col-md-3'>
          <select className='form-select' onChange={handleCatSelect}>
            <option selected>Sort By Category</option>
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
          <select className='form-select' onChange={handlePriceSelect}>
            <option selected>Sort By Price</option>
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