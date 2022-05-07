import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";



function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        // setProducts(res.data)
        console.log(res);
        res.json().then((data) => {
          console.log(data);
          setProducts(data)
        })
      })
    }
    request();
  }, []);


  return (
    <div>
      <SearchBar />
      <ContentDisplay />
    </div>
  );
}

export default App;