import axios from 'axios';

export const GET_PRODUCTS = 'get_products'; 

const ROOT_URL = 'http://localhost:8000'; 

export const getProducts = (query) => {
  const request = axios.get(`${ROOT_URL}/products`, {
    params: {...query}
  });

  return {type: GET_PRODUCTS, payload: request};
};


