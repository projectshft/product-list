import "./App.css";
import Header from "./components/Header.js";
import List from "./components/List.js";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [queryParams, setQueryParams] = useState({});

  const handleSearch = async (event) => {
    event.preventDefault();

    let query = event.target.query.value ? event.target.query.value : null;
    let category =
      event.target.category.value === "none"
        ? null
        : event.target.category.value;
    let price =
      event.target.price.value === "none" ? null : event.target.price.value;

    await fetchLogs(query, category, price);
  };

  const fetchLogs = async (query, category, price, page) => {
    let URLString = "?";
    if (page) {
      URLString += `page=${page}&`;
    }
    if (query) {
      URLString += `query=${query}&`;
    }
    if (category) {
      URLString += `category=${category}&`;
    }
    if (price) {
      URLString += `price=${price}&`;
    }
    let newParams = {
      query,
      category,
      price,
    };

    const res = await fetch(`http://localhost:8000/products${URLString}`);
    const data = await res.json();

    let { products, count } = data;
    setItems(products);
    setCount(count);
    setQueryParams(newParams);
  };

  return (
    <>
      <Header handleSearch={handleSearch} items={items} />
      <List
        items={items}
        count={count}
        fetchLogs={fetchLogs}
        queryParams={queryParams}
      />
    </>
  );
}

export default App;
