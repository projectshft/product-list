import React from 'react';
import SearchBar from './Search-bar';
import SearchCategory from './Search-category';
import SearchPrice from './Search-price';
import { fetchProducts, setProducts, setCount, setInvalidSearch} from "../reducer/slice";
import { useDispatch } from "react-redux";




function SearchArea () {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    const products = await dispatch(fetchProducts());
    dispatch(setProducts(products.payload.products));
    dispatch(setCount(products.payload.count));
    if(!products.length) {
      dispatch(setInvalidSearch(true));
    }
  }
  return (
    <div className = "container mt-5">
      <div className='row justify-content-center'>
        <SearchBar/>
        <SearchCategory/>
        <SearchPrice/>
        <button onClick = {handleButtonClick} className = "col-md-1 btn btn-sm btn-primary">Search</button>
      </div>
    </div>
  )
}

export default SearchArea;