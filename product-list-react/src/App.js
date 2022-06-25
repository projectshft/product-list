import './App.css';
import SearchBar from './components/SearchBar';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container content">
      <div className="header row">
        <SearchBar/>
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
