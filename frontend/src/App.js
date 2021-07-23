import "./App.css";
//components
import ProductCard from "./components/ProductCard";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadProductsData } from "./actions/productsAction";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const { products, loaded } = useSelector((state) => state.products);
  const productArray = products.products;
  console.log(productArray);

  useEffect(() => {
    dispatch(loadProductsData());
  }, [dispatch]);

  return (
    <div className="App">
      {loaded ? (
        <div className="products">
          <h1>Products Eval</h1>
          {productArray.map((product) => (
            <ProductCard
              name={product.name}
              category={product.category}
              id={product._id}
              key={product._id}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
