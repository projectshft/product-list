import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar'
import Store from './components/Product'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Ecommerce Store</h1>
        <Searchbar/>
        <Store/>
      </header>
    </div>
  );
}

export default App;
