import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/actions';

const App = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("");

  const dispatch = useDispatch();

  const searches = useSelector(state => state.searches);

  useEffect(()=>{
    console.log('state is: '+query+", "+category+", "+price+", "+page);
    dispatch(getProducts(query,category,price,page));
  },[query,category,price,page])

  const catChangeHandler = (e) => {
    console.log('category: '+e.target.value);
    if (e.target.value !== 'Filter by Category') {
      setCategory(e.target.value);
    }
  }

  const priceChangeHandler = (e) => {
    console.log('sort: '+e.target.value);
    if (e.target.value !== 'Sort by Price') {
      setPrice(e.target.value);
    }
  }

  const queryKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('query: '+e.target.value);
      setQuery(e.target.value)
    }
  }

  const renderSearches = () => {
    return(
      searches.map((search) => {
        return (
          <div className="col-4 product-outer-col">
            <div className="col-8 offset-2 product-inner-col">
            
              <div className="row">
                <div className="col product-cat-text">
                  Category: <strong>{search.category}</strong>
                </div>
                <div className="col-4 product-price-text fs-3 fw-bold">
                  ${search.price}
                </div>
              </div>

              <div className="row">
                <img src={search.image} alt="" className="product-img rounded mx-auto d-block"></img>
              </div>

              <div className="row">
                <h2 className="product-name-text text-center">{search.name}</h2>
              </div>

            </div>
          </div>
        )
      })
    )
  }

  const renderPagination = () => {
    return (
      <div><h3>{searches.length}</h3></div>
    )
  }

  return (
  <div className="container">
    <div className="row top-row">
     <div className="col-6">
      <input type="text" className="form-control" placeholder="Search" onKeyPress={queryKeyPressHandler} />
     </div>
     <div className="col-3">
      <select className="form-select" aria-label="Default select example" onChange={catChangeHandler}>
        <option selected className="fst-italic">Filter by Category</option>
        <option value="">--</option>
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
        <option value="jewelery">Jewelery</option>
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
     <div className="col-3">
      <select className="form-select" aria-label="Default select example" onChange={priceChangeHandler}>
          <option selected className="fst-italic">Sort by Price</option>
          <option value="">--</option>
          <option value="lowest">Lowest to Highest</option>
          <option value="highest">Highest to Lowest</option>
        </select>
     </div>
    </div>

    <div className="row product-row align-items-center">
      {renderSearches()}
    </div>

    <div className="row page-row">
      {renderPagination()}
    </div>
  </div>
  )
}

export default App;