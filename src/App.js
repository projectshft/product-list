import "./App.css";
import Header from "./components/Header.js";
import List from "./components/List.js";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    let query = event.target.query.value ? event.target.query.value : null;
    let category =
      event.target.category.value === "none"
        ? null
        : event.target.category.value;
    let price =
      event.target.price.value === "none" ? null : event.target.price.value;
    let page = 1;
    
    const searchResults = await fetchLogs(query, category, price, page);

    setItems(searchResults);
  };

  const fetchLogs = async (query, category, price, page) => {
    let queryString = `?page=${page}&`

    if (query) {
      queryString += `query=${query}&`;
    }
    if (category) {
      queryString += `category=${category}&`;
    }
    if (price) {
      queryString += `price=${price}&`
    }

    const res = await fetch(`http://localhost:8000/products${queryString}`);
    const data = await res.json();

    return data;
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <List items={items} />
    </>
  );
}

export default App;
