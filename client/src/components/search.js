import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../actions';


import { Dropdown, Option } from "./dropdown";


const Search = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [page, setPage] = useState('');
  const handleSearchClick = () => {
    dispatch(fetchProducts(`query=${query}&category=${category}&price=${price}&page=${page}`));
  };

  
  const dispatch = useDispatch();


  const handleSelect = (e) => {
    setCategory(e.target.value);
    handleSearchClick();
  };

  // This calls dispatch every time category changes
  useEffect(() => {
    handleSearchClick()
 }, [category]);

 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    handleSearchClick();
    setQuery('');
    setCategory('');
    setPrice('');
    setPage('');
  }

//   useEffect(() => {
//     dispatch(fetchProducts(query))
//  }, []);


  return (

    <div className='search-container container'>
      <div className='row'>
        <div className='col'>
          <form id='form' onSubmit={handleFormSubmit}>
          {/* {useEffect(()=>handleSearchClick())} */}
            <div className='form-group'>

              <input
                name='search'
                placeholder='Search'
                value={query} onChange={(e) => setQuery(e.target.value)}
              ></input>
              
              <button 
                type='submit'
                className='btn'
              >submit</button>
            
            </div>
          </form>
        </div>
        <div className='col'>
          
        { <Dropdown
        onChange={handleSelect}
        >
        <Option selected value="Click to see categories"/>
        <Option value="Home"  />
        <Option value="Garden" />
        <Option value="Electronics" />
        <Option value="Jewelery" />
        <Option value="Grocery" />
        <Option value="Clothing" />
        <Option value="Outdoors" />
        <Option value="Tools" />
        <Option value="Industrial" />
        <Option value="Shoes" />
        <Option value="Baby" />
        <Option value="Sports" />
        <Option value="Music" />
        <Option value="Toys" />
        <Option value="Movies" />
        <Option value="Beauty" />
        <Option value="Health" />
        <Option value="Automotive" />
        <Option value="Books" />
        <Option value="Computers" />
        <Option value="Kids" />


      </Dropdown>
       }
        </div>
    </div>
  </div>
            
          

      
    
  )
}


export default Search

