import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";



function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        res.json().then((data) => {
          setProducts(data)
        })
      })
    }
    request();
  }, []);



  return (
    <div>
      <div>
        <SearchBar />
        <ContentDisplay products={products}/>
        <Pagination />
      </div>
    </div>
  );
}

export default App;