import logo from './logo.svg';
import './App.css';
import Dropdown from './components/Dropdown'
import Product from './components/Product'

function App() {
  return (
    <div className="App">
      <h1>Ecommerce Store</h1>
      <Dropdown/>
      <Product/> 
    </div>
  );
}

export default App;
