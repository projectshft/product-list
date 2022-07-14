import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const ROOT_URL = "https://localhost:8000/products";

export function fetchProducts(data) {

    const request = axios.get(`${ROOT_URL}`)

    return {
      type: FETCH_PRODUCTS,
      payload: request
    }
}