"use client";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import { fetchProducts } from "./store/slices/productData";
import { getProductCount } from "./store/slices/productCount";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const categoryOptions = [
  { value: "", label: "Sort By Category" },
  { value: "Automotive", label: "Automotive" },
  { value: "Beauty", label: "Beauty" },
  { value: "Books", label: "Books" },
  { value: "Computers", label: "Computers" },
  { value: "Clothing", label: "Clothing" },
  { value: "Electronics", label: "Electronics" },
  { value: "Games", label: "Games" },
  { value: "Garden", label: "Garden" },
  { value: "Grocery", label: "Grocery" },
  { value: "Health", label: "Health" },
  { value: "Home", label: "Home" },
  { value: "Industrial", label: "Industrial" },
  { value: "Jewelery", label: "Jewelery" },
  { value: "Kids", label: "Kids" },
  { value: "Movies", label: "Movies" },
  { value: "Music", label: "Music" },
  { value: "Outdoors", label: "Outdoors" },
  { value: "Shoes", label: "Shoes" },
  { value: "Sports", label: "Sports" },
  { value: "Tools", label: "Tools" },
  { value: "Toys", label: "Toys" },
];

const priceOptions = [
  { value: "", label: "Sort By Price" },
  { value: "lowest", label: "Low to High" },
  { value: "highest", label: "High to Low" },
];

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const count = useSelector((state) => state.count.data);
  const [pages, setPages] = useState([]);
  const [query, setQuery] = useState("");
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts(query));
    dispatch(getProductCount(query));
  }, [dispatch, query]);

  useEffect(() => {
    let numPages = [];
    for (let i = 1; i <= Math.ceil(count?.count / 9); i++) {
      numPages.push(i);
    }
    setPages(numPages);
  }, [count]);

  const sortCategory = (category) => {
    updateQuery("category", category);
  };

  const sortPrice = (price) => {
    updateQuery("price", price);
  };

  const getSearch = (search) => {
    setUserSearch(search);
  };

  const searchProducts = () => {
    updateQuery("search", userSearch);
  };

  const handlePagination = (page) => {
    updateQuery("page", page);
  };

  const updateQuery = (string, input) => {
    if (query.includes(`&${string}`)) {
      const index = query.indexOf(`&${string}`);
      setQuery(`${query.slice(0, index)}&${string}=${input}`);
      return;
    }
    if (query.includes(`?${string}`)) {
      const index = query.indexOf(`?${string}`);
      setQuery(`${query.slice(0, index)}?${string}=${input}`);
      return;
    }
    if (query !== "") {
      setQuery(`${query}&${string}=${input}`);
      return;
    }
    setQuery(`?${string}=${input}`);
  };

  return (
    <div className="container">
      <form className="p-2 d-flex">
        <SortDropdown
          value="category"
          id="category"
          options={categoryOptions}
          onChange={sortCategory}
        />
        <SortDropdown
          value="price"
          id="price"
          options={priceOptions}
          onChange={sortPrice}
        />
        <SearchBar onChange={getSearch} onSearch={searchProducts} />
      </form>
      <div className="container">
        <div className="row">
          {products &&
            products.map((product) => (
              <div key={product.id} className="col-sm">
                <ProductCard
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  key={product.id}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {count &&
          pages.map((page) => (
            <button
              key={page}
              className="btn btn-light"
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
      </div>
    </div>
  );
}
