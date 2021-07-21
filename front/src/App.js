import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products);

  return (
    <>
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row">
          {products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                category={product.category}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
