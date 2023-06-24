import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { fetchProducts } from "../actions";


const SearchBar = () => {

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  //dispatches action when form is submitted
  const handleFormSubmit = () => {
    alert("Submit!")
  };

  return (
    <form onSubmit={handleFormSubmit} className='container row'>
      <div className='form-group'>
        <label className='form-label'>Search Products</label>
      </div>
      <div className='mb-3 row'>
        <div className='col-md-6'>
          <input className='form-control' type='text' placeholder='Search'></input>
        </div>
        <div className='col-md-3'>
          <select className='form-select'>
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
          <select className='form-select'>
            <option selected>Sort By Price</option>
            <option>Highest</option>
            <option>Lowest</option>
          </select>
        </div>
      </div>
      <hr />
    </form>
  );
};

export default SearchBar;