import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setCategories, setCategory, setPage } from "../reducer/slice";


 
function SearchCategory (props) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setCategory(event.target.value));
    dispatch(setPage(1));
  }
  useEffect(() => {
    async function getCategories () {dispatch(setCategories((await dispatch(fetchCategories())).payload))};
    getCategories();
  }, []);

  const categories = useSelector(state => state.categories);
  const categoriesMap = () => 
    {if(categories) {
     return (categories.map(category => <option key = { category } value={ category }>{ category }</option>))
    } else {return (<div></div>)}}
  return (
    <select onChange = {handleChange} className="col form-select" aria-label="Default select example">
  <option value="">Select Category</option>
  {categoriesMap()}
</select>
  )
}


export default SearchCategory;