import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import SingleProduct from './components/SingleProduct';

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/products/:id' element={<SingleProduct />}/>
  <Route path='*' element={<NoMatch />}/>
</Routes>

function App() {
  return (
    
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
