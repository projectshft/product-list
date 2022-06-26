import './App.css';
import Controls from './Controls';
import Pagination from './Pagination';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <Controls />
      <ProductList />
      <Pagination />
    </div>
  );
}

export default App;
