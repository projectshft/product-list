import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ContentDisplay from "./components/ContentDisplay";



function App() {
  useEffect(() => {
    const request = async () =>{
      await fetch('http://localhost:8000/products', {
        method: 'GET',
        mode: 'cors'
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