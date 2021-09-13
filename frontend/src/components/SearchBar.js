/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import axios from "axios"


export default function SearchBar () {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  //use useEffect to preload categories for extension exercise
  let categories = ['Sports', 'Beauty', 'Music', 'Baby', 'Garden', 'Books', 'Kids', 'Home', 'Jewelry', 'Grocery', 'Electronics'];
  categories = categories.sort();
  
  const handleSearch = e => {
    axios.get(`http://localhost:8000/products`, {
      params: {
        q: query,
        category: category,
        price: sort
      }
    })
    .then(res => {
      console.log(res)
      //add res to redux store then call function to populate entries
    })
  }

  return (
    <div className = "container">
      <div className = "input-group">
        <input type="text" id="query" className="form-control" placeholder="Enter search term" onChange={(e) => setQuery(e.target.value)}></input>

        
        <div className = "dropdown"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" id="category" data-bs-toggle="dropdown" aria-expanded="false">{category ? category: "Sort by Category"}</button>
          <ul className="dropdown-menu" aria-labelledby="category"> 
            
         {categories.map(cat => (
            <li><a className="dropdown-item" href="#" value={cat} key={cat} onClick={(e) => setCategory(e.target.text)}>
              {cat}
            </a></li> 
          ))} 
            <li><a className="dropdown-item" href="#" onClick={() => setCategory('')}>reset
            </a></li>
          </ul>
       </div>
       <div className = "dropdown"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" id="sort" data-bs-toggle="dropdown" aria-expanded="false">{sort ? sort: "Sort by Price"}</button>
          <ul className="dropdown-menu" aria-labelledby="sort">          
            <li><a className="dropdown-item" href="#" onClick={(e) => setSort(e.target.text)}>highest
            </a></li>
            <li><a className="dropdown-item" href="#" onClick={(e) => setSort(e.target.text)}>lowest
            </a></li>
            <li><a className="dropdown-item" href="#" onClick={() => setSort('')}>reset
            </a></li>
             
        

          </ul>
       </div>
        <button className='button btn btn-primary' onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}