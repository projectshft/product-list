//components
import Search from "./components/Search";
import ProductCard from "./components/ProductCard";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadProductsData } from "./actions/productsAction";
import { useEffect } from "react";
//style
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const dispatch = useDispatch();
  const { products, loaded } = useSelector((state) => state.products);
  const productArray = products.products;

  // useEffect(() => {
  //   dispatch(loadProductsData());
  // }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyle />
      <h1>Products Eval</h1>
      <Search />
      <br></br>
      {loaded ? (
        <StyledProducts>
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
        </StyledProducts>
      ) : (
        ""
      )}
    </div>
  );
};

const StyledProducts = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default App;
