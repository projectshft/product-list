import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";
import fetchProducts from "./Redux/actions";






function App() {

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);
  

  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        res.json().then((data) => {
          // console.log('ContentDisplay through setProduct:')
          // setProducts(data)
          console.log('Content Display through fetchProducts:');
          dispatch(fetchProducts(data));
          setDispatched(true);
        })
      })
    }
    request();
  }, []);



  return (
    <div>
      <div>
        <SearchBar />
        {dispatched && <ContentDisplay />}
        <Pagination />
      </div>
    </div>
  );
}

export default App;