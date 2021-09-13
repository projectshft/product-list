import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/actions';

const App = () => {

  const dispatch = useDispatch();

  const catChangeHandler = (e) => {
    console.log(e.target.value);
    // dispatch(getProducts());
  }

  const priceChangeHandler = (e) => {
    console.log(e.target.value);
  }

  return (
  <div className="container">
    <div className="row">
     <div className="col">
      <input type="text" className="form-control" placeholder="Search" />
     </div>
     <div className="col">
      <select className="form-select" aria-label="Default select example" onChange={catChangeHandler}>
        <option selected className="fst-italic">Filter by Category</option>
        <option value="automotive">Automotive</option>
        <option value="baby" >Baby</option>
        <option value="beauty">Beauty</option>
        <option value="books">Books</option>
        <option value="clothing">Clothing</option>
        <option value="computers">Computers</option>
        <option value="electronics">Electronics</option>
        <option value="games">Games</option>
        <option value="garden">Garden</option>
        <option value="grocery">Grocery</option>
        <option value="health">Health</option>
        <option value="home">Home</option>
        <option value="industrial">Industrial</option>
        <option value="jewelry">Jewelry</option>
        <option value="kids">Kids</option>
        <option value="movies">Movies</option>
        <option value="music">Music</option>
        <option value="outdoors">Outdoors</option>
        <option value="shoes">Shoes</option>
        <option value="sports">Sports</option>
        <option value="tools">Tools</option>
        <option value="toys">Toys</option>
    
      </select>
     </div>
     <div className="col">
      <select className="form-select" aria-label="Default select example" onChange={priceChangeHandler}>
          <option selected className="fst-italic">Sort by Price</option>
          <option value="lowest">Lowest to Highest</option>
          <option value="highest">Highest to Lowest</option>
        </select>
     </div>
    </div>

    <div className="row">
      <h2>Table Here</h2>
    </div>
  </div>
  )
}

export default App;