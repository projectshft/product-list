import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts() {

    // const request = axios.get(`${ROOT_URL}`)
    const request = axios.get(`http://localhost:8000/products`)

    return {
      type: FETCH_PRODUCTS,
      payload: request
    }
}