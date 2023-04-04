import { FETCH_PAGES, FETCH_PRODUCTS, } from "./types";
import axios from "axios";

export const fetchProducts = (query, category, price) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/products`, {
        params: {
          query: query,
          category: category,
          price: price
        }
      });
      const products = response.data.products;
      // const pages = response.data.pages
      // console.log("pages", pages)
      // console.log("response", response)
      dispatch({type: FETCH_PRODUCTS, payload: { products: products}});
      // dispatch({type: FETCH_PAGES, payload: {pages: pages}})
  } catch (error) {
    console.error("Data Error", error);
  }
};



 