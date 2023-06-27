import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts =  async (page, query, category, price)  => {
  try {
    const stringTogetherUrl = () => {
      let result = '';
      const base = 'http://localhost:8000/products?';
      if (page) {
        result += `${result ? '&' : ''}page=${page}`;
      }
      if (query) {
        result += `${result ? '&' : ''}query=${query}`;
      }
      // search can't differentiate query term from category, and will search by query as default 
      if (category) {
        result += `${result ? '&' : ''}category=${category}`;
      }
      if (price) {
        result += `&price=${price}`;
      }

      return result ? `${base}${result}` : base;
    };
    const request = await axios.get(stringTogetherUrl());
    console.log(stringTogetherUrl());

    return {
      type: FETCH_PRODUCTS, 
      payload: request
      }
  } catch (error) {
    console.log(error.message);
    return;
  }
};
