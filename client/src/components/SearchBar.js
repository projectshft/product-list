import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../actions";
 
function SearchBar() {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct(item || "/products"));
  };

  return (
    <div>
      <form className="input-group" onSubmit={handleFormSubmit}>
        <input
          className="form-control"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        ></input>
        <span className="input-group-btn">
          <button type="sumbit" className="btn btn-secondary">
            Search
          </button>
        </span>
      </form>
    </div>
  );
}
export default SearchBar;
