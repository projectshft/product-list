import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

// Action builds out the url string and includes the specific page, query, category, and/or price filter if present
export function fetchProducts (page, query, category, price) {
  const url = "http://localhost:8000/products?";

  const setPage = () => {
    if (page) {
      return `page=${page}`;
    } else {
      return `page=`
    };
  };

  const setQuery = () => {
    if (query) {
      return `&query=${query}`;
    } else {
      return `&query=`
    };
  };

  const setCategory = () => {
    if (category) {
      return `&category=${category}`;
    } else {
      return `&category=`
    };
  };

  const setPrice = () => {
    if (price) {
      return `&price=${price}`;
    } else {
      return `&price=`
    };
  };

  const request = axios.get(url+setPage()+setQuery()+setCategory()+setPrice());
  
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
};