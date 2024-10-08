// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductIdProvider } from './contexts/ProductIdContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage'; // Adjust the path as necessary

import { Provider } from 'react-redux';
import store from './redux/store'; 

import './assets/styles/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './components/navbar'; 
// In your App.js or index.js file
import './assets/styles/global.css'; // Adjust the path as necessary

function App() {
  return (
    <Provider store={store}>
      <ProductIdProvider>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage/>} />
            
          </Routes>
        </div>
      </Router>
      </ProductIdProvider>
    </Provider>
  );
}

export default App;
