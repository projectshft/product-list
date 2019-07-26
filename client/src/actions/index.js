import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000"

export function fetchProducts(query) {
    let requestURL = axios.get(`${ROOT_URL}/products/`)
}