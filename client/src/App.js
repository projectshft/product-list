import React from "react";
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Images from './components/Images'
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";

import './App.css'


function App() {
  return (
    <React.Fragment>
      <Header />
      <SearchBar />
      <Images /> 
    </React.Fragment>
  );
}

export default App;