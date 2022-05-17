import { fetchProducts } from "../Redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  
  const searchByCategory = async (e) => {
    const value = e.target.value;
    const url = `http://localhost:8000/products?category=${value}`
    await fetch(url, {
      method: 'GET', 
      mode: 'cors'
    })
    .then((res) => res.json())
    .then((data) => dispatch(fetchProducts(data)));
  }

  const categories = ['Baby', 'Beauty', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Grocery', 'Home', 'Jewelry', 'Kids', 'Movies', 'Music', 'Outdoors', 'Shoes', 'Sports', 'Tools', 'Toys'];

  return (
  <div>
    <input type="text" placeholder="Search"/>
    <label htmlFor="categories">Choose a Category: </label>
    <select id="categories" onChange={searchByCategory}>
      <option value='' key="0">All</option>
      {categories.map((cat, index) => {
        return <option value={`${cat}`} key={index + 1}>{cat}</option>
      })}
    </select>
  </div>
  )
}

export default SearchBar;