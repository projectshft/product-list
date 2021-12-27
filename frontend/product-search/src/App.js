import './App.css';
import SearchOptions from './components/SearchOptions';
import ProductDisplay from './components/ProductDisplay';
import Pagination from './components/Pagination'

const App = () => {
  return (
    <div>
      <SearchOptions />
      <ProductDisplay />
      <Pagination />
    </div>
  );
};

export default App;
