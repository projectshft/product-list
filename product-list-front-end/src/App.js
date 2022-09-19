import './App.css';
import SearchBar from './containers/SearchBar';
import Products from './containers/Products';
import Pagination from './containers/Pagination';

function App() {
  return (
    <div className="container-fluid">
      <SearchBar />
      <Products />
      <Pagination />
    </div>
  );
}

export default App;
