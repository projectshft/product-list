import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export async function fetchProducts() {
  const request = await axios.get("http://localhost:8000/products");
  const data = await request.data;
  const products = data.docs;
  
  if (request) {
    return {
      type: FETCH_PRODUCTS,
      payload: products,
    };
  } else {
    return {
      type: FETCH_PRODUCTS,
      payload: products,
    };
  }
}

export default fetchProducts;
      
      
   


