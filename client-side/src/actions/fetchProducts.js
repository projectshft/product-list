import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

const baseURL = "http://localhost:8000/products";

export async function fetchProducts(search) {
  let param = `?query=${search}`;
  const request = await axios(`${baseURL}`, { params: param });
  const data = await request.data;
  const products = data.docs;

  
    return {
      type: FETCH_PRODUCTS,
      payload: { products: products, search: search },
    };
  
}


export default fetchProducts;
      
      
   


