import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchResults from "./components/SearchResults";
import Layout from "./components/Layout";

function App() {
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const searchArray = [];

    if (page) {
      searchArray.push(`page=${page}`);
    }

    if (category.length > 0) {
      searchArray.push(`category=${category}`);
    }

    if (price.length > 0) {
      searchArray.push(`price=${price}`);
    }

    if (query.length > 0) {
      searchArray.push(`query=${query}`);
    }

    setSearchString(searchArray.join("&"));
  }, [page, category, price, query]);

  return (
    <div className="mx-auto">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              page={page}
              setPage={setPage}
              totalResults={totalResults}
              setCategory={setCategory}
              setPrice={setPrice}
              setQuery={setQuery}
              query={query}
            />
          }
        >
          <Route
            index
            element={
              <SearchResults
                setTotalResults={setTotalResults}
                category={category}
                searchString={searchString}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
