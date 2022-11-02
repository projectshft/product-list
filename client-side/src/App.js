import SearchProducts from "./components/SearchProducts.js";
import DisplayGrid from "./components/DisplayGrid.js";
import React, { useState, useMemo } from "react";
import Pagination from "./components/Pagination.js";
import "./App.css";

let PageSize = 9;

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
        className="pagination-bar"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default App;
