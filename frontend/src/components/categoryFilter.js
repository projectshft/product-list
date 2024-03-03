import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../slices/categoryFilterSlice";
import axios from "axios";
import { Dropdown } from "bootstrap";


const CategoryDropdown = () => {

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/categories')
      .then(response => {
        setCategories(response.data)
        console.log(response.data)
      })
      
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleCategorySelect = (category) => {
    dispatch(setCategory(category))
  };


  return (

    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle me-2" type="button" id="categoryDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
        Sort By Category
      </button>
      <ul className="dropdown-menu" aria-labelledby="categoryDropdownButton">
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleCategorySelect(category)}>
            <a className="dropdown-item" href="#">{category}</a>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default CategoryDropdown;