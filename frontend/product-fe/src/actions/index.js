import axios from "axios";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

export function fetchProducts(page = "", query = "", category = "", price = "") {
  let queryString = "";
  if (page) {
    queryString += `page=${page}&`
  }
  if (query) {
    queryString += `query=${query}`
  }
  if (category) {
    queryString += `category=${category}`
  }
  if (price) {
    queryString += `price=${price}`
  }

  return (dispatch) => {
    axios.get(`http://localhost:8000/products?${queryString}`)
      .then((response) => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: response.data
        })
      })
  }
}