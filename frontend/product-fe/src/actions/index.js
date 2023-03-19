import axios from "axios";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

export function fetchProducts(query) {
  // TODO: GET request to all products
  return (dispatch) => {
    axios.get(`http://localhost:8000/products`)
      .then((response) => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: response.data
        })
      })
  }
}