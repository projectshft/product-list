import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export async function fetchProducts(searchOptions) {
  const query = searchOptions || '';

  const params = new URLSearchParams();
    params.append("query", query.searchQuery);
    params.append("category", query.filterCategory);
    params.append("sort", query.sortPrice);
    const queryParams = {
      params: params
    };

  const request = await axios.get(`http://localhost:8000/products`, queryParams)
  .catch(error => {
    console.error(error);
  });

    return {
      type: FETCH_PRODUCTS,
      payload: request
    }
}