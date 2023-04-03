import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTest } from "./actions";
import Nav from "./NavBar";
import ProductDetails from "./ProductDetail";


const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [page, setPage] = useState(0);
  const items = 9;

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <ProductDetails products={products}/>
    </div>
  );
};

export default ProductPage;
