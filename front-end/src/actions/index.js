import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const DELETE_WEATHER = 'DELETE_WEATHER';
export const FETCH_BY_QUERY = 'FETCH_BY_QUERY';

const ROOT_URL = 'http://localhost:8000';

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}/products`).catch((error) => {
    if (error.response) {
      alert('Invalid search. Enter a valid product name or category.');
    }
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchbyQuery(searchQuery, category, price) {
  const request = axios
    .get(
      `${ROOT_URL}/products?category=${category}&price=${price}&name=${searchQuery}`
    )
    .catch((error) => {
      if (error.response) {
        alert('Invalid search. Enter a valid product name or category.');
      }
    });

  return {
    type: FETCH_BY_QUERY,
    payload: request,
  };
}

export const deleteWeather = (id) => ({
  type: DELETE_WEATHER,
  payload: id,
});
