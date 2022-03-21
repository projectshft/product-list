import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const ROOT_URL = 'http://localhost:8000';

export const fetchProducts = async () => {
  const request = await axios.get(`${ROOT_URL}/products`).catch((error) => {
    if (error.response) {
      alert(error.response);
    }
  });
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
};
