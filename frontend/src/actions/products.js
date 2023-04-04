import { FETCH_PAGE, FETCH_PRODUCTS } from "./types";
import axios from "axios";

export const fetchProducts =
  (query, category, price, page) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8000/products`, {
        params: {
          query: query,
          category: category,
          price: price,
          page: page,
        },
      });
      const products = response.data.products;
      const pages = response.data.page;
      dispatch({ type: FETCH_PRODUCTS, payload: { products: products } });
      dispatch({ type: FETCH_PAGE, payload: { page: pages } });
    } catch (error) {
      console.error("Data Error", error);
    }
  };
