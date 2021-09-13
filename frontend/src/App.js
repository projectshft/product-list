import './App.css';
import SearchBar from "./components/SearchBar"
import Products from "./components/Products"
import PageCount from './components/PageCount';
function App() {
  return (
    <div className = "App container">
      <h1>The Nonsense Store</h1>
      <SearchBar />
      <Products />
      <PageCount />
    </div>
  );
}

export default App;
