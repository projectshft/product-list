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
  console.log('app')
  

  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        res.json().then((data) => {
          console.log('ContentDisplay through setProduct:')
          setProducts(data)
          // console.log('Content Display through fetchProducts:')
          // dispatch(fetchProducts(data))
        })
      })
    }
    request();
  }, []);



  return (
    <div>
      <div>
        <SearchBar />
        {products.length > 0 && <ContentDisplay products={products}/>}
        <Pagination />
      </div>
    </div>
  );
}

export default App;