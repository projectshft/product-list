import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";

const ROOT_URL = "http://localhost:8000";

export function getProducts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/products`);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

// export function getProduct(id) {
//   const request = axios.get(`${ROOT_URL}/products/${id}`);

//   return {
//     type: GET_PRODUCT,
//     payload: request
//   }
// }

