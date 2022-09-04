import axios from "axios";

export const ADD_PRODUCTS = "ADD_PRODUCTS";

const ROOT_URL = "http://localhost:8000";

export async function addProducts({ page, category, price, query }) {
    const params = {
      page: page || 1,
      category: category || '',
      price: price || '',
      query: query || ''
    };
  
    let request = await axios
      .get(`${ROOT_URL}/products?`, { params: params })
      .catch(error => alert(`No results`));

    request.data.categories.unshift('All')
  return {
    type: ADD_PRODUCTS,
    payload: {...request},
  };
}