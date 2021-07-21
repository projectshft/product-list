import ProductCard from "./components/ProductCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        <ProductCard />
      </div>
    </div>
  );
}

export default App;
