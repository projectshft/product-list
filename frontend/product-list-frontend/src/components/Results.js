import React from "react";
import Result from "./Result";
import Pages from "./Pages";
import { useSelector } from "react-redux";

const Results = () => {
  const products = useSelector(state => state.products);
  const invalidSearch = useSelector(state => state.invalidSearch)
  const searchResults = () => {
    if(invalidSearch && products.length === 0){return <h2>No Search Results. Try a new Search</h2>}
    else if (products.length > 0){
    return <h2>Search Results</h2>
    }
  }

      return (
  <div className = "container mt-4">
    <div className="row">
      <div className="col">
      {searchResults()}
      </div>
      <Result/>
      <Pages/>
      </div>
    </div>
    )
}

export default Results;