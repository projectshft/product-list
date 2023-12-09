import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import SearchResults from "./components/SearchResults";
import Layout from "./components/Layout";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <div className="mx-auto">
      <Routes>
        <Route path="/" element={<Layout page={page} setPage={setPage} totalPages={totalPages} />}>
          <Route index element={<SearchResults page={page} setPage={setPage} totalPages={totalPages} setTotalPages={setTotalPages} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
