import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";
import fetchProducts from "./Redux/actions";




function App() {

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);


  //Stack conversatoin about passing search parameters to fetch:
  //https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request

  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        res.json().then((data) => {
          setProducts(data)
          // dispatch(fetchProducts(data));
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