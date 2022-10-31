import SearchProducts from "./components/SearchProducts.js";
import DisplayGrid from "./components/DisplayGrid.js";
import React, { useState } from "react";

const App = () => {
  const [ category, setCategory ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ query, setQuery ] = useState("");
  //to-do: paginate results

  //to-do: add pagination below DisplayGrid
  return (
    <div>
      <SearchProducts
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
      <DisplayGrid/>
    </div>
  );
};

export default App;
