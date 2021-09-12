import './App.css';
import SearchBar from './components/search-bar';
import Products from './components/products';
import Pagination from './components/pagination';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Amazon</h1>
      </header>
      <SearchBar />
      <Products />
      <Pagination />
    </div>
  );
}

export default App;
