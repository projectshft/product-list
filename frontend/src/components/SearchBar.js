/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import { getProductsAsync } from "../redux/productSlice";
export default function SearchBar () {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  
  const dispatch = useDispatch();
  //update search params -- better way to do this?
  const params = {};
  
  // use useEffect to track query, category, sort and then update params object. It's a subscription
  useEffect(() => {
    if (query) {
      params.query = query
    }

    if(price) {
      params.price = price
    }

    if (category) {
      params.category = category
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, price, category])


  //use useEffect to preload categories for extension exercise
  let categories = ['Sports', 'Beauty', 'Music', 'Baby', 'Garden', 'Books', 'Kids', 'Home', 'Jewelry', 'Grocery', 'Electronics'];
  categories = categories.sort();
  

  const handleSearch = e => {
    dispatch(getProductsAsync(params));
    // axios.get(`http://localhost:8000/products`, {
    //   params: params
    // })
    // .then(res => {
    //   console.log(res)
    //   //add res to redux store then call function to populate entries
    // })
  }
  const handleQuery = e =>{
    setQuery(e.target.value); 
  }

  const handleCategory = e => {
    setCategory(e.target.text);
    handleSearch();
  }

  const categoryReset = () => {
    setCategory('');
  }

  const handlePrice = e => {
    setPrice(e.target.text);
  }

  const priceReset = () => {
    setPrice('');
  }
  return (
    <div className = "container">
      <div className = "input-group">
        <input type="text" id="query" className="form-control" placeholder="Enter search term" onChange={handleQuery}></input>

        
        <div className = "dropdown"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" id="category" data-bs-toggle="dropdown" aria-expanded="false">{category ? category: "Sort by Category"}</button>
          <ul className="dropdown-menu" aria-labelledby="category"> 
            
         {categories.map(cat => (
            <li><a className="dropdown-item" href="#" value={cat} key={cat} onClick={handleCategory}>
              {cat}
            </a></li> 
          ))} 
            <li><a className="dropdown-item" href="#" onClick={categoryReset}>reset
            </a></li>
          </ul>
       </div>
       <div className = "dropdown"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" id="sort" data-bs-toggle="dropdown" aria-expanded="false">{price ? price: "Sort by Price"}</button>
          <ul className="dropdown-menu" aria-labelledby="sort">          
            <li><a className="dropdown-item" href="#" onClick={handlePrice}>highest
            </a></li>
            <li><a className="dropdown-item" href="#" onClick={handlePrice}>lowest
            </a></li>
            <li><a className="dropdown-item" href="#" onClick={priceReset}>reset
            </a></li>
             
        

          </ul>
       </div>
        <button className='button btn btn-primary' onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}