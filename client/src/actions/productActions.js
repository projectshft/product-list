import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts =  async (priceFilter, category, query)  => {
  try {
    const getString = () => {
      let result = '';
      const base = 'http://localhost:8000/products?';
      if (priceFilter) {
        result += `price=${priceFilter}`;
      }
      if (category) {
        result += `${result ? '&' : ''}category=${category}`;
      }
      if (query) {
        result += `${result ? '&' : ''}query=${query}`;
      }
      return result ? `${base}${result}` : base;
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