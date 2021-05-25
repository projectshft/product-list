import './App.css';
import ItemContainer from './components/ItemContainer';
import Dropdown from './components/Dropdown';
import PriceFilter from './components/PriceFilter';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination'
import React from 'react';
import {firstSearch} from './actions'
import { useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1 className='text-center'>Products-List</h1>
      <div className='row'>
        <div className='col-sm-3 offset-md-2'>
          <SearchBar/> 
        </div>
        <div className='col-sm-2'>
          <Dropdown/>
        </div>
        <div className='col-sm-2'>
          <PriceFilter/>
        </div>
        <div className='col-sm-2'>
          <button className='btn btn-primary' onClick={()=>{dispatch(firstSearch())}}>Remove Filters</button>
        </div>
        <ItemContainer/>
    </div>
    <Pagination/>
  </div>
  );
}

export default App;
