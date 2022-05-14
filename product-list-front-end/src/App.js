import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";
import { fetchProducts } from './Redux/actions';

function App() {

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);
  
  const urlBase = 'http://localhost:8000/products';

  useEffect(() => {
    
    const request = async () =>{
      const page = 1;
      const paginatedURL = `${urlBase}?page=${page}`

      await fetch(paginatedURL, {
        method: 'GET',
        mode: 'cors'
      })
      .then((res) => {
        res.json().then((data) => {
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