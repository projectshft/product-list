import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

/* This builds up the url used to fetch the correct products,
   fetches those products, then passes along the requested data
   to the reducer */

export async function fetchProducts(query = {}) {
  let url = 'http://localhost:8000/products';
  let previousQuery = false;

  // Sets first query to be after a ? and all the rest to be after an &

  for (let key in query) {
    if (previousQuery) {
      url += `&${key}=${query[key]}`;
    } else {
      url += `?${key}=${query[key]}`; 
      previousQuery = true;
    }
  }

  const request = await axios.get(url);
  const { docs: products, total, pages, page, limit } = request.data;  

  return {
    type: FETCH_PRODUCTS,
    payload: request,
    products,
    total,
    pages,
    page,
    limit
  };
}