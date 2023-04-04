import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./actions";
import Nav from "./NavBar";
import ProductDetails from "./ProductDetail";


const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const items = 9;

  useEffect(() => {
    dispatch(fetchProducts(search, category));
  }, [dispatch, search, category]);

  return (
    <div>
    <Nav onSearch={(e) => setSearch(e)} onCategory={(e) => setCategory(e)}/>
    <ProductDetails products={products} />
  </div>
)
};


export default ProductPage;
