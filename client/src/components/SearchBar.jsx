
import React, {useState} from 'react';
import { fetchProducts } from '../actions/index';  
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from 'react-hook-form';


function SearchBar() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()

  const [category, setSelectCategory]=useState("");
  const [price, setSelectPrice]=useState("");

  const handleSearchSubmit = (data, e) => {
   console.log(data.search, category, price);  
  
   let query = data.search;
   dispatch(fetchProducts(category, price, query))
   e.target.reset();
}
  return (
<div className="container search-sort-area">
  <form className="form" onSubmit={handleSubmit(handleSearchSubmit)}>
  <div className="input-group search-bar">
  <input 
  type="text" 
  className="form-control mb-3" 
  placeholder="Search" 
  name="search"
  {...register("search")}
  aria-label="Search" 
  aria-describedby="button-addon2" />
  </div>

  <select className="form-select" aria-label="sort by category"  
  value={category}
  onChange={(e) => setSelectCategory(e.target.value)}>
  <option value="DEFAULT">Sort by Category</option>
  <option value="automotive">Automotive</option>
  <option value="baby">Baby</option>
  <option value="beauty">Beauty</option>
  <option value="books">Books</option>
  <option value="clothing">Clothing</option>
  <option value="computer">Computer</option>
  <option value="electronics">Electronics</option>
  <option value="games">Games</option>
  <option value="garden">Garden</option>
  <option value="grocery">Grocery</option>
  <option value="health">Health</option>
  <option value="home">Home</option>
  <option value="industrial">Industrial</option>
  <option value="jewelry">Jewelry</option>
  <option value="kids">Kids</option>
  <option value="movies">Movies</option>
  <option value="music">Music</option>
  <option value="outdoors">Outdoors</option>
  <option value="shoes">Shoes</option>
  <option value="sports">Sports</option>
  <option value="tools">Tools</option>
  <option value="toys">Toys</option>
</select>


<select className="form-select" 
aria-label="sort by price"
value={price}
onChange={(e) => setSelectPrice(e.target.value)}
placeholder="Sort by Price">

  <option value="DEFAULT">Sort by Price</option>
  <option value="highest">Highest</option>
  <option value="lowest">Lowest</option>
</select>

<button 
  className="btn btn-outline-primary mb-3" 
  type="submit">Search</button>
</form>
</div>

  );
}

export default SearchBar;