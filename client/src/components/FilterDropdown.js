import React from "react";
import{ useState } from 'react';


const FilterDropdown = () => {
  const [value, setValue] = useState('Highest');
  const [cat, setCategory] = useState('tools');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const handleChng = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className='overall div'>
      <label>
        Sort By Price:
        <select value={value} onChange={handleChange}>
          <option value="highest">Highest to lowest</option>
          <option value="lowest">Lowest to highest</option>
        </select>
      </label>

      <label>
        Sort By Category:
        <select value={cat} onChange={handleChng}>
          <option value="tools">Tools</option>
          <option value="toys">Toys</option>
          <option value="food">Food</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="kids">Kids</option>
          <option value="health">Health</option>
          <option value="shoes">Shoes</option>
          <option value="outdoors">Outdoors</option>
          <option value="garden">Garden</option>
          <option value="games">Games</option>
          <option value="music">Music</option>
          <option value="books">Books</option>
          <option value="movies">Movies</option>
          <option value="automotive">Automotive</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="computer">Computer</option>
          <option value="baby">Baby</option>
          <option value="industrial">Industrial</option>
          <option value="jewelery">Jewelery</option>
          <option value="grocery">Grocery</option>
          <option value="sports">Sports</option>
        </select>
      </label>
    </div>
  );
};
  
export default FilterDropdown;
