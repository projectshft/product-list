import './App.css';
import SearchBar from './components/search-bar';
import Products from './components/products';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Amazon</h1>
      </header>
      <SearchBar />
      <Products />
    </div>
  );
}

export default App;
