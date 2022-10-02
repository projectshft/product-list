import { useDispatch } from "react-redux";
import { fetchProducts } from "../actions";
import { useState, useEffect } from "react";

const defaultSearch = {
  query: "",
  price: undefined,
  category: "",
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(defaultSearch);

  useEffect(() => {
    dispatch(fetchProducts(search));
  }, [search, dispatch]);

  function handleQuery(e) {
    e.preventDefault();
    setSearch({ ...search, query: e.target.value });
  }

  function handleCategory(e) {
    e.preventDefault();
    setSearch({ ...search, category: e.target.value });
  }

  function handlePrice(e) {
    e.preventDefault();
    setSearch({ ...search, price: e.target.value });
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <p className="navbar-brand">Product-List</p>
      <form className="form-inline my-2 my-lg-0">
        <div className="input-group">
          <input
            className="form-control mr-sm"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="query"
            onChange={(e) => handleQuery(e)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
          <div className="input-group-append">
            <select
              className=" dropdown-toggle"
              data-toggle="dropdown"
              onChange={(e) => handleCategory(e)}
              value={search.category}
            >
              <option className="dropdown-item" value="">
                Search by Category
              </option>
              <option className="dropdown-item" value="Shoes">
                Shoes
              </option>
              <option className="dropdown-item" value="Computers">
                Computers
              </option>
              <option className="dropdown-item" value="Baby">
                Baby
              </option>
              <option className="dropdown-item" value="Toys">
                Toys
              </option>
              <option className="dropdown-item" value="Industrial">
                Industrial
              </option>
              <option className="dropdown-item" value="Electronics">
                Electronics
              </option>
              <option className="dropdown-item" value="Clothing">
                Clothing
              </option>
              <option className="dropdown-item" value="Tools">
                Tools
              </option>
              <option className="dropdown-item" value="Health">
                Health
              </option>
            </select>
          </div>
          <div className="input-group">
            <select
              className=" dropdown-toggle"
              data-toggle="dropdown"
              onChange={(e) => handlePrice(e)}
              value={search.price}
            >
              <option className="dropdown-item" value="">
                Sort by Price
              </option>
              <option className="dropdown-item" value="highest">
                Highest
              </option>
              <option className="dropdown-item" value="lowest">
                Lowest
              </option>
            </select>
          </div>
        </div>
      </form>
    </nav>
  );
};

export default SearchBar;
