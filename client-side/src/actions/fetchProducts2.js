// import axios from "axios";

// export const FETCH_PRODUCTS2 = "FETCH_PRODUCTS2";
// export const FETCH_PRODUCTS2_ERROR = "FETCH_PRODUCTS2_ERROR";

// const baseURL = "http://localhost:8000/products";

// export async function fetchProducts2(search) {
//   let param = `?query=${search.category}`;
//   const request = await axios(`${baseURL}`, { params: param });
//   const data = await request.data;
//   const products = data.docs;
  
  
//     return {
//       type: FETCH_PRODUCTS2,
//       payload: { products: products, search: search },
//     };
  
// }


// export default fetchProducts2;