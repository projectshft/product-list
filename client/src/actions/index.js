import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const PAGINATE_PRODUCTS = 'paginate_products';
export const PRICE_SORT = 'price_sort';
export const CATEGORY_FILTER = 'category_filter';


const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function paginateProducts(id) {
  const request = axios.get(`${ROOT_URL}?page=${id}`)
  return {
    type: PAGINATE_PRODUCTS,
    payload: request
  }
}

export function categoryFilter(id) {
  const request = axios.get(`${ROOT_URL}?category=${id}`)
  return {
    type: CATEGORY_FILTER,
    payload: request
  }
}

export function priceSort(id) {
  const request = axios.get(`${ROOT_URL}?price=${id}`)
  return {
    type: PRICE_SORT,
    payload: request
  }
}