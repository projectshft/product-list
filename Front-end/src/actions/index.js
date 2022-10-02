import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const ROOT_URL = "http://localhost:8000/products";

export async function fetchProducts(search) {
  const request = await axios(`${ROOT_URL}`, { params: search });

  return {
    type: FETCH_PRODUCTS,
    payload: { products: request, search },
  };
}
