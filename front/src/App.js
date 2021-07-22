import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import PageNavigation from "./components/PageNavigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCount, fetchAllCategories } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(""));
    dispatch(fetchCount(""));
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const products = useSelector((state) => state.products);

  return (
    <>
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div className="row justify-content-center">
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
        <PageNavigation />
      </div>
    </>
  );
}

export default App;
