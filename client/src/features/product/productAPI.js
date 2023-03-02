import axios from 'axios';

const BASE_URL = 'http://localhost:8000/myProducts';

export const fetchProducts = (categoryQuery, productQuery, priceQuery, pageQuery) => {
  return axios.get(`${BASE_URL}?name=${productQuery}&category=${categoryQuery}&price=${priceQuery}&page=${pageQuery}`)
};