import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchResults from "./components/SearchResults";
import Layout from "./components/Layout";

function App() {
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const searchArray = [];

    if (page) {
      searchArray.push(`page=${page}`);
    }

    if (category.length > 0) {
      searchArray.push(`category=${category}`)
    }

    setSearchString(searchArray.join("&"));
  }, [page, category]);

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
            />
          }
        >
          <Route
            index
            element={
              <SearchResults
                page={page}
                setPage={setPage}
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
