import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../actions/index';

const defaultQuery = {
  price: undefined,
  category: '',
  query: '',
};
export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(defaultQuery);

  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [searchQuery, dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, query: e.target.value });
  }

  function handleChangeCategory(e) {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, category: e.target.value });
  }

  function handleChangeSortByPrice(e) {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, price: e.target.value });
  }
  return (
    <form className="row col-md-10 offset-md-1 text-center search">
      <input
        type="text"
        name="Product Search"
        id="name"
        className="col-md-5"
        placeholder="Search for a product"
        onChange={(e) => handleSearch(e)}
        value={searchQuery.query}
      />
      <div className="col-md-3">
        <select
          className="form-select "
          aria-label="Default select example"
          value={searchQuery.category}
          onChange={(e) => handleChangeCategory(e)}
        >
          <option value="">Sort by Category</option>
          <option value="">All categories</option>
          <option value="Games">Games</option>
          <option value="Health">Health</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Movies">Movies</option>
          <option value="Automotive">Automotive</option>
          <option value="Toys">Toys</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Garden">Garden</option>
          <option value="Jewelery">Jewelery</option>
          <option value="Beauty">Beauty</option>
        </select>
      </div>
      <div className="col-md-3">
        <select
          className="form-select "
          aria-label="Default select example"
          defaultValue=""
          value={searchQuery.price}
          onChange={(e) => handleChangeSortByPrice(e)}
        >
          <option value="">Sort by Price</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
          <option value="">No sort</option>
        </select>
      </div>
    </form>
  );
}
