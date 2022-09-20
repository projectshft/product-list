import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { findData } from "./actions/index";

import NavBar from './components/navbar';
import Products from './components/products';
import Footer from "./components/footer";

const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.reducer.filter);
  dispatch(findData(filter));

  return (
    <div className="container">
      <NavBar />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
