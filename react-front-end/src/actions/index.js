import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";

export function getProducts(endpoint) {
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
