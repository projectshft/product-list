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

  
  const pageOne = (data) => {
    setPage(1);
  }

  const pageTwo = (data) => {
    setPage(2);
  }

  const pageThree = (data) => {
    setPage(3);
  }

  const pageFour = (data) => {
    setPage(4);
  }
  
  const pageFive = (data) => {
    setPage(5);
  }

  const pageSix = (data) => {
    setPage(6);
  }

  const pageSeven = (data) => {
    setPage(7);
  }

  const pageEight = (data) => {
    setPage(8);
  }

  const pageNine = (data) => {
    setPage(9);
  }

  const pageTen = (data) => {
    setPage(10);
  }

  const pageEleven = (data) => {
    setPage(11);
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
          <p>{previous}</p> <p onClick={pageOne}>1</p> <p onClick={pageTwo}>2</p> <p onClick={pageThree}>3</p> <p onClick={pageFour}>4</p> <p onClick={pageFive}>5</p> <p onClick={pageSix}>6</p> <p onClick={pageSeven}>7</p> <p onClick={pageEight}>8</p> <p onClick={pageNine}>9</p> <p onClick={pageTen}>10</p><p onClick={pageEleven}>11</p><p>{next}</p>
        </div>
      </div>
    </div>
  );
}

export default App;