import { Route, Routes } from "react-router-dom";

import SearchResults from "./components/SearchResults";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="mx-auto">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchResults />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
