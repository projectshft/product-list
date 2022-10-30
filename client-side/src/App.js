import SearchProducts from "./components/SearchProducts.js";
import DisplayGrid from "./components/DisplayGrid.js";
import React, { useState } from "react";

const App = () => {
  const [ query, setQuery ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ price, setPrice ] = useState("");
  //to-do: paginate results

  //to-do: add pagination below DisplayGrid
  return (
    <div>
      <SearchProducts
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
