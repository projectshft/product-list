import './App.css';
import ProductSearch from './components/ProductSearch';
import CategorySearch from './components/CategorySearch';
import PriceQuery from './components/PriceQuery';
import ShowProducts from './components/ShowProducts';
import PageShow from './components/PageShow';


const App = () => {
  return (
  <>
  <div className="App" >
  <h2>Fake Store!</h2>
  <ProductSearch/>
  <div className="dropdown-parent">
    <div className="drop-down-child">
    <CategorySearch/>
    </div>
    <div className="child">
     <PriceQuery />
     </div>
  </div>
  <ShowProducts/>
  <PageShow />
  </div>
  </>
  );
};

export default App;
