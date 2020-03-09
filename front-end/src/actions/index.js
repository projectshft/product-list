import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

export async function fetchProducts(query = {}) {
  let url = 'http://localhost:8000/products';
  let previousQuery = false;

  // query filter and request
  console.log(' query params inside action call ', query)
  for (let key in query) {
    if (previousQuery) {
      url += `&${key}=${query[key]}`;
    } else {
      url += `?${key}=${query[key]}`;
      previousQuery = true;
    }
  }

  const request = await axios.get(url);
  const { products, total, pages, page, category, limit } = request.data;
  return {
    type: FETCH_PRODUCTS,
    payload: request,
    products,
    total,
    pages,
    page,
    category,
    limit
  };
}
//  GET CATEGORIES call 
export const GET_CATEGORIES = "get_categories";

export function getCategories(category) {
  return {
    type: GET_CATEGORIES,
    payload: category
  };
}
