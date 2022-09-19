import './App.css';
import SearchBar from './containers/SearchBar';
import Products from './containers/Products';

function App() {
  return (
    <div className="container-fluid">
      <SearchBar />
      <Products />
    </div>
  );
}

export default App;
