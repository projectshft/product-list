import SearchBar from './components/SearchBar'
import './App.css';
import FilterDropdown from './components/FilterDropdown';
import ProductList from "./components/ProductList";


function App () {
  return (
    <div>
      <div className='header'>
        <SearchBar />
        <FilterDropdown /> 
      </div>
      <ProductList />

    </div>
  );
};
export default App;

//filter drop down needs to take in product category as props