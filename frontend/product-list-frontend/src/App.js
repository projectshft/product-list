import logo from './logo.svg';
import SearchArea from './components/Search-area'
import Results from './components/Results';
import './App.css';


function App() {
  
  return (
    <div className="App">
      <div className = "container">
      <SearchArea/>
      <Results/>
      </div>
    </div>
  );
}

export default App;



