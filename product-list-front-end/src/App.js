import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";
import fetchProducts from "./Redux/actions";






function App() {

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);
  
  const urlBase = 'http://localhost:8000/products';

  useEffect(() => {

    const paginatedFetch = (url = urlBase, page = 1, previousResponse = []) => {
      return fetch(`${url}?page=${page}`)
      .then(response => response.json())
      .then(newResponse => {
        const response = [...previousResponse, ...newResponse]; 
  
        if (newResponse.length !== 0) {
          page++;
  
          return paginatedFetch(url, page, response);
        }
  
        return response;
      })
      .then((res) => {
        console.log(res)
        dispatch(fetchProducts(res));
        setDispatched(true);
      })
    }
    paginatedFetch();
    
    // const request = async () =>{
    //   await fetch(url, {
    //     method: 'GET',
    //     mode: 'cors'
    //   })
    //   .then((res) => {
    //     res.json().then((data) => {
    //       dispatch(fetchProducts(data));
    //       setDispatched(true);
    //     })
    //   })
    // }
    // request();
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