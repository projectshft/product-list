import React from "react";
import{ useState } from 'react';


const FilterDropdown = () => {
  const [value, setValue] = useState('highest');
  const [cat, setCategory] = useState('tools');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const handleChng = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div className='navbar'>
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
          <option value="Tools">Tools</option>
          <option value="Toys">Toys</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
          <option value="Beauty">Beauty</option>
          <option value="Kids">Kids</option>
          <option value="Health">Health</option>
          <option value="Shoes">Shoes</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Garden">Garden</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Books">Books</option>
          <option value="Movies">Movies</option>
          <option value="Automotive">Automotive</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Computer">Computer</option>
          <option value="Baby">Baby</option>
          <option value="Industrial">Industrial</option>
          <option value="Jewelery">Jewelery</option>
          <option value="Grocery">Grocery</option>
          <option value="Sports">Sports</option>
        </select>
      </label>
    </div>
  );
};
  
export default FilterDropdown;
