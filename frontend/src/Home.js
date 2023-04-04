import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { fetchProducts } from "./actions/products";
import ProductInfo from "./ProductInfo";

// ProductList component
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts(search, category, price, page));
  }, [dispatch, search, category, price, page]);

  const refreshProducts = () => {
    setSearch("");
    setCategory("");
    setPrice("");
  };

  const refreshPage = (e) => {
    setPage(e);
  };

  return (
    <div>
      <NavBar
        onSearch={(e) => setSearch(e)}
        onCategory={(e) => setCategory(e)}
        onPrice={(e) => setPrice(e)}
        onRefresh={refreshProducts}
        onPage={refreshPage}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-bar-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
        />
      </svg>
      <button
        className="btn-btn"
        disabled={page === 0}
        onClick={() => refreshPage(page - 1)}
      >
        Back
      </button>
      <button
        disabled={products.length <= 1}
        onClick={() => refreshPage(page + 1)}
      >
        Next
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-bar-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"
        />
      </svg>
      <ProductInfo products={products} />
    </div>
  );
};

export default Home;
