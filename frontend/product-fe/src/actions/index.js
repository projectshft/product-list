import axios from "axios";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export function fetchProducts(page, query, category, price) {
  
  const persistedCategory = localStorage.getItem('selectedCategory');
  const persistedPrice = localStorage.getItem('selectedPrice');

  let queryString = "";
  if (page) {
    queryString += `page=${page}&`
  }
  if (query) {
    queryString += `query=${query}&`
  }
  if (persistedCategory) {
    queryString += `category=${persistedCategory}&`
  } else if (category) {
    queryString += `category=${category}&`
  }
  if (persistedPrice) {
    queryString += `price=${persistedPrice}&`
  } else if (price) {
    queryString += `price=${price}&`
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