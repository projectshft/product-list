import SearchBar from './components/SearchBar'
import './App.css';
import FilterDropdown from './components/FilterDropdown';
import ProductList from "./components/ProductList";
// import Paginate from './components/Paginate';

function App () {
  return (
    <div>
      <div className='header'>
        <SearchBar />
        <FilterDropdown />
      </div>
      <ProductList />
      {/* <Paginate /> */}
    </div>
  );
};
export default App;