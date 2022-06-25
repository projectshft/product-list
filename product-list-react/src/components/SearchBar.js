import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearch } from '../reducers/productsSlice';
import Dropdowns from './Dropdowns';


const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleClick = () => {
    // dispatch(setSearch(searchQuery))
    dispatch(fetchSearch(searchQuery))
  }

  return (
    <div className="row">
      <div className="input-group col">
        <input onChange={handleChange} type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <button onClick={handleClick} type="submit" className="btn btn-outline-primary">search</button>
        <Dropdowns/>
     </div>
    </div>
  )
}

export default SearchBar;