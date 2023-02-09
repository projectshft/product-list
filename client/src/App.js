import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductSearch from './components/ProductSearch';

import ProductContainer from './components/ProductContainer';



function App() {
  return (
  <BrowserRouter>
    <div className="App">
     <h2>Fake Store!</h2>
     <ProductSearch/> 
        
        <ProductContainer />
         
          
          
          
       
     <Routes>
      <Route>
        
      </Route>
     </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
