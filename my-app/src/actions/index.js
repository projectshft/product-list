import axios from 'axios';

export const PRODUCTS_RECIEVED = 'PRODUCTS_RECIEVED';

export const getProducts = (category, priceSort, query) => {
  const ROOT_URL = 'http://localhost:8000/products?'

  const request = axios.get(`${ROOT_URL}category=${category}&query=${query}&price=${priceSort}`)
    .catch((error) => {
      throw error;
    });

  return {
    type: PRODUCTS_RECIEVED,
    payload: request
  }
}