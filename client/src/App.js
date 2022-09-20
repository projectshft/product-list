import React from "react";

import NavBar from './components/navbar';
import Products from './components/products';
import Footer from "./components/footer";

const App = () => {
  

  return (
    <div className="container">
      <NavBar />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
