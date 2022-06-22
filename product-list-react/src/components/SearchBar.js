import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setSearch } from '../reducers/productsSlice';


const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleClick = () => {
    dispatch(setSearch(searchQuery))
  }

  return (
    <div className="input-group col-md">
      <input onChange={handleChange} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
      <button onClick={handleClick} type="submit" className="btn btn-outline-primary">search</button>
    </div>
  )
}

export default SearchBar;