import { useDispatch,useSelector } from 'react-redux';
import { fetchProducts } from '../actions/fetch_products';
import '../index.css';
import './app';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import RenderQuery from './searchResults';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [page, setPage] = useState('');
  const dispatch = useDispatch();
  const handleSearchClick = () => {
    dispatch(fetchProducts(query, category, price, page));
  };

  const RenderPages = () => {
    const count = useSelector(state => state.count);
    const totalPages = Math.ceil(count / 9)
    
    const pageBack = (number) => {
      if (page > 1) {
        setPage(number-1);
        handleSearchClick();
      }
    };

    const pageForward = (number) => {
      if (page < totalPages) {
        setPage(number+1);
        handleSearchClick();
      }
    };

    const pages = (count) => {
      const numbers = []
      const pageNumber = (number) => {
        setPage(number);
        handleSearchClick();
      };
      for (let i =1; i<=count; i=i+1){
        const page = i
        numbers.push(<li class="page-item" ><button class="page-link" onClick={()=>pageNumber(page)}>{i}</button></li>)
      }
      
      return numbers
    };
  
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <button class="page-link" aria-label="Previous" onClick={() => pageBack(page)}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages(totalPages)}
          <li class="page-item">
            <button class="page-link" aria-label="Next" onClick={() => pageForward(page)}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <div className='container'>

      <div className='row input-group'>
        <input name="query" type="text" className="searchbar form-control col-md-4" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <input className="btn btn-primary col-md-1" type="submit" value="Search" onClick={handleSearchClick}></input>
        {useEffect(()=>handleSearchClick())}
      </div>

      <div className='row justify-content-end'>

        <div className='form-group col-md-2'>
          <select classname="form-select" aria-label="Default select example" onChange={(e) => {setPrice(e.target.value);setPage(1)}}>
            <option selected value='' >Sort by Price</option>
            <option value='lowest' >Low to High</option>
            <option value='highest' >High to Low</option>
          </select>
        </div>

        <div className='form-group col-md-3'>
          <select classname="form-select" aria-label="Default select example" onChange={(e) => {setCategory(e.target.value);setPage(1)}}>
            <option selected value='' >Select Category</option>
            <option value='automotive'>Automotive</option>
            <option value='baby' >Baby</option>
            <option value='beauty' >Beauty</option>
            <option value='books' >Books</option>
            <option value='clothing' >Clothing</option>
            <option value='computers' >Computers</option>
            <option value='electronics' >Electronics</option>
            <option value='games' >Games</option>
            <option value='garden' >Garden</option>
            <option value='grocery' >Grocery</option>
            <option value='health' >Health</option>
            <option value='home' >Home</option>
            <option value='industrial' >Industrial</option>
            <option value='jewelery' >Jewelery</option>
            <option value='shoes' >Shoes</option>
            <option value='movies'>Movies</option>
            <option value='music' >Music</option>
            <option value='outdoors' >Outdoors</option>

          </select>
        </div>

      </div>

      <div className='row'>
        <RenderQuery />
        {RenderPages()}
      </div>
    </div>
  )
};

export default Searchbar;