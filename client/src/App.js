import React, { useState } from "react";
import Header from './Header'
import SearchBar from './SearchBar'
import Images from './Images'

function App() {
  return (
    <React.Fragment>
      <Header />
      <h1 className="text-heading">Header here</h1>
      <SearchBar />
      <Images /> 
    </React.Fragment>
  );
}

export default App;


