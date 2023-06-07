import { useEffect, useState } from "react"; 
import { useDispatch } from "react-redux";
import { fetchProduct } from "../actions";

function SearchBar(){

  const [item, setItem] = useState('');
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct(item || '/products'));
    
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
      <div class="dropdown show">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="/products"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort by:
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/products?page=1&price=highest">
            Highest Price
          </a>
          <a class="dropdown-item" href="/products?page=1&price=lowest">
            Lowest Price
          </a>
        </div>
      </div>
    </div>
    
  );
        }
export default SearchBar;