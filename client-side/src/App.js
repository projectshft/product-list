/* eslint-disable jsx-a11y/anchor-is-valid */
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import SearchProducts from "./components/SearchProducts.js";
import DisplayGrid from "./components/DisplayGrid.js";
import React, { useState } from "react";

const App = () => {
  const [ query, setQuery ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ price, setPrice ] = useState("");
  //to-do: paginate results

  return (
    <div>
      <SearchProducts
        {/* to-do: add pagination */}
        query={query}
        category={category}
        price={price}
        setQuery={setQuery}
        setCategory={setCategory}
        setPrice={setPrice}
      />
      <DisplayGrid/>
      {/* to-do: add pagination */}
    </div>
  );
};

export default App;
