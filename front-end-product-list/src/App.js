import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SearchBar from './containers/Search-Bar';
import DisplayProducts from './containers/Display-Products';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const products = useSelector((state) => state.search);
  
  const conditionalRender=()=>{
    if ( !products) return null;
    else return <DisplayProducts />
 
  }
  return (
    <div className="container">
      <SearchBar />
      {conditionalRender()}
    </div>
  );
}

export default App;