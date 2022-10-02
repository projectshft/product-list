import "./App.css";
import Home from "./components/Home";
import SearchBar from "./containers/searchbar";



function App() {
  return (
    <div className="App">
      <div>
        <SearchBar />
        <br />
        <br />
        <Home />
      </div>
    </div>
  );
}

export default App;
