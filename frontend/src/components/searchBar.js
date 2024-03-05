
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";

const SearchBar = () => {

  const dispatch = useDispatch();
//Handles input change on input change 
  const handleChange = (event) => {

    dispatch(setSearchTerm(event.target.value))
  };
//Handles form submission on submit
  const handleSubmit = (event) => {

    event.preventDefault();
  };

  return (

    <form onSubmit={handleSubmit}>
      <input
        type='search'
        className="form-control"
        placeholder="Search"
        aria-label="search"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;