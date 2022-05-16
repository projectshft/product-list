import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "./Components/SearchBar";
import ContentDisplay from "./Components/ContentDisplay";
import { fetchProducts } from './Redux/actions';

function App() {

  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  const [page, setPage] = useState(1);

  const setCurrentPageNumber = (val) => {
    setPage(val);
  }

  
  const previousPage = () => {
    if (page > 1) {
      const newNumber = page - 1;
      setPage(newNumber);
    }
  }

  const nextPage = () => {
    if (page < 11) {
      const newNumber = page + 1;
      setPage(newNumber)
    }
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

  const pageNumber = Array.from({length: 11}, (_, i) => i + 1)

  return (
    <div>
      <div>
        <SearchBar />
        {dispatched && <ContentDisplay />}
        <div className="right-align">
          <p onClick={previousPage}>{previous}</p>
          {pageNumber.map((num) => <p onClick={() => setCurrentPageNumber(num)}>{num}</p>)}
          <p onClick={nextPage}>{next}</p>
        </div>
      </div>
    </div>
  );
}

export default App;