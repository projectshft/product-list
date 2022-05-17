import { fetchProducts } from "../Redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  
  const searchByCategory = async (e) => {
    const value = e.target.value;
    
    if (value === '') {
        const url = `http://localhost:8000/products`
        await fetch(url, {
          method: 'GET', 
          mode: 'cors'
        })
        .then((res) => res.json())
        .then((data) => dispatch(fetchProducts(data)));
    } else {
          const url = `http://localhost:8000/products?category=${value}`
        await fetch(url, {
          method: 'GET', 
          mode: 'cors'
        })
        .then((res) => res.json())
        .then((data) => dispatch(fetchProducts(data)));
    }
  }

  const categories = ['Baby', 'Beauty', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Grocery', 'Home', 'Jewelry', 'Kids', 'Movies', 'Music', 'Outdoors', 'Shoes', 'Sports', 'Tools', 'Toys'];

  const changeHandler = (e) => {
    console.log(e.target.value)
  };

  return (
  <div>
    <div className="container">
      <div className="row">
        <div className="col">
          <input type="text" placeholder="Search" onChange={changeHandler}/>
        </div>
        <div className="col">
          <label id="categories-label" className="float-right" htmlFor="categories">Choose a Category: </label>
        </div>
        <div className="col-sm-2">
          <select className="float-right" id="categories" onChange={changeHandler}>
            <option value='' key="0">All</option>
            {categories.map((cat, index) => {
              return <option value={`${cat}`} key={index + 1}>{cat}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SearchBar;