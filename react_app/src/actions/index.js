import axios from "axios";
import { FETCH_PRODUCTS } from "./types";

const productsApi = function (call) {
  return `http://localhost:8000/products${call}`
}

export const fetchAllProducts = (query, price, category) => async (dispatch) => {
  try {
    const filter = [];

      if (query) filter.push(`?query=${query}`);
      if (category) filter.push(`?category=${category}`);
      if (price) filter.push(`?price=${price}`);
      //**Having a hard time making all of them work in sync */
      const allFilters = filter.length > 0 ? `${filter.join("&")}` : "";

    const response = await axios.get(productsApi(allFilters));
    console.log(response);

    dispatch({type: FETCH_PRODUCTS, payload: response.data})
  } catch (error) {
    console.error("Unable to fetch products", error)
  }
};