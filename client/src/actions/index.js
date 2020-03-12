import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000/products?";

export function fetchProducts(query) {
  console.log('actions query: ', query)
  const request = axios.get(`${ROOT_URL}${query.page}&${query.category}&${query.price}&${query.name}`)
      .then((response) => {
          return response.data
      })
      .catch( (error) => {
          console.log(error)
      });

  console.log(request)
  
  return {
      type: FETCH_PRODUCTS,
      payload: request
  };
}

