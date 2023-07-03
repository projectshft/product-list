import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = async (priceFilter, category, query, page)  => {
  try {
    const getString = () => {
      let result = '';
      const ROOT = 'http://localhost:8000/products?';
      if (priceFilter) {
        result += `price=${priceFilter}`;
      }
      if (category) {
        result += `${result ? '&' : ''}category=${category}`;
      }
      if (query) {
        result += `${result ? '&' : ''}query=${query}`;
      }
      if (page) {
        result += `${result ? '&' : ''}page=${page}`;
      }

      return result ? `${ROOT}${result}` : ROOT;
    };
    const request = await axios.get(getString());

    return {
      type: FETCH_PRODUCTS, 
      payload: request
      }
  } catch (error) {
    console.log(error.message);
    return;
  }
};