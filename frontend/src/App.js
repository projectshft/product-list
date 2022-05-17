import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Products from "./components/Products";
import PageCount from "./components/PageCount";

function App() {
  const [showAllProducts, setShowAllProducts] = useState(true);

  return (
    <div className='App container'>
      <h1>The Nonsense Store</h1>
      <SearchBar setShowAllProducts={setShowAllProducts} />
      <Products />
      <PageCount showAllProducts={showAllProducts} />
    </div>
  );
}

export default App;
