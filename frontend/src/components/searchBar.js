
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";

const SearchBar = () => {

  const dispatch = useDispatch();

  const handleChange = (event) => {

    dispatch(setSearchTerm(event.target.value))
    console.log(event.target.value)
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(event)
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