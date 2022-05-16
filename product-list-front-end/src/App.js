import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import Pagination from "./Components/Pagination";
import { fetchProducts } from './Redux/actions';

function App() {

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  const [page, setPage] = useState(1);

  const pageFive = (data) => {
    setPage(5);
  }
  
  const urlBase = 'http://localhost:8000/products';

  const previous = '<<previous'
  const next = 'next>>'

  useEffect(() => {
    
    const request = async () =>{
      const pageNum = page;
      const paginatedURL = `${urlBase}?page=${pageNum}`

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
  }, [page, dispatch]);

  return (
    <div>
      <div>
        <SearchBar />
        {dispatched && <ContentDisplay />}
        {/* <Pagination /> */}
        <div className="right-align">
          <p>{previous}</p> <p>1</p> <p>2</p> <p>3</p> <p>4</p> <p onClick={pageFive}>5</p> <p>6</p> <p>7</p> <p>8</p> <p>9</p> <p>10</p><p>11</p><p>{next}</p>
        </div>
      </div>
    </div>
  );
}

export default App;