import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchCategories } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const products = useSelector((state) => state.data.products);
  const totalPages = useSelector((state) => state.data.totalPages);
  const categories = useSelector((state) => state.data.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData(currentPage, category, price, searchQuery));
  }, [dispatch, category, price, searchQuery]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(fetchData(pageNumber, category, price, searchQuery));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className="App container">
      <div className="search-container my-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            style={{ flex: "2" }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="form-control"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Sort by category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            value={price}
            onChange={handlePriceChange}
          >
            <option value="">Sort by price</option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
        </div>
      </div>
  
      <div className="products-grid row justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="product-item col-md-3 m-4">
            <div className="product-category">Category: <b>{product.category}</b></div>
            <div className="product-price">${product.price}</div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
  
      <div className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`btn btn-light mx-1 ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
