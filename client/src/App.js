import './App.css';
import ProductSearch from './components/ProductSearch';
import CategorySearch from './components/CategorySearch';
import PriceQuery from './components/PriceQuery';
import ShowProducts from './components/ShowProducts';
import PageShow from './components/PageShow';


const App = () => {
  return (
  
  <div className="App" >
  <h2>Fake Store!</h2>
  <CategorySearch/>
  <ProductSearch/>
  <PriceQuery />
  <ShowProducts/>
  <PageShow />
  </div>
  );
};

export default App;
