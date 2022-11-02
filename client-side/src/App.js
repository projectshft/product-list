import SearchProducts from "./components/SearchProducts.js";
import DisplayGrid from "./components/DisplayGrid.js";
import Pagination from "./components/Pagination.js";
import React, { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");

  return (
    <div>
      <SearchProducts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
      <DisplayGrid />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        price = {price}
        category = {category}
        query = {query}
        setPrice = {setPrice}
        setCategory = {setCategory}
        setQuery = {setQuery}
      />
    </div>
  );
};

export default App;
