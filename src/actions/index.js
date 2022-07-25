import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(searchOptions) {
  const query = searchOptions || '';

  const params = new URLSearchParams();
    params.append("query", query.searchQuery);
    params.append("category", query.filterCategory);
    params.append("sort", query.sortPrice);
    const queryParams = {
      params: params
    };

  const request = axios.get(`http://localhost:8000/products`, queryParams);

    return {
      type: FETCH_PRODUCTS,
      payload: request
    }
}