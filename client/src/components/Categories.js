import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCategory } from '../redux/actions'
import './Categories.css';

const Categories = () => {
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  
  // Category Dropdown
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // is action firing?
    dispatch(updateCategory(category));
  }
 
  return (
    <div>
      <form>
        <select value={category} onChange={handleCategoryChange} className="menu-1"> 
          <option value="">Category</option>  
          <option value="Beauty">Beauty</option>
          <option value="Books">Books</option>
          <option value="Computers">Computers</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Games">Games</option>
          <option value="Garden">Garden</option>                   
          <option value="Grocery">Grocery</option>
          <option value="Health">Health</option>
          <option value="Home">Home</option>
          <option value="Industrial">Industrial</option>
          <option value="Movies">Movies</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Shoes">Shoes</option>
          <option value="Sports">Sports</option>
          <option value="Tools">Tools</option>
        </select> 
        <button onClick={handleSubmit} type="submit">Search</button>
      </form>
       
    </div>

    );
  };

export default Categories;