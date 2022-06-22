import './App.css';
import SearchBar from './components/SearchBar';
import Dropdowns from './components/Dropdowns';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container content">
      <div className="header row">
        <SearchBar/>
        <Dropdowns/>
      </div>
      <div className ="products row">
        <Products/>
      </div>
      <div className="footer row">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
