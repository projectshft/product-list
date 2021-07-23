import "./App.css";
//components
import ProductCard from "./components/ProductCard";
//redux
import { useDispatch } from "react-redux";
import { loadProductsData } from "./actions/productsAction";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsData);
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Products Eval</h1>
      <ProductCard />
    </div>
  );
};

export default App;
