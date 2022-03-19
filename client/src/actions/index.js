//Other way
import axios from "axios";


export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const SET_ERROR = "SET_ERROR";
export const FETCH_PRODUCT_COUNT = "FETCH_PRODUCT_COUNT";


const ROOT_URL = "http://localhost:8000/products?";


const fetchProductsSuccess = (products) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products },
});

export const fetchProducts = (category, price, query, page=1) => {

return async(dispatch) => {
  try {
    const request = await axios.get(`${ROOT_URL}page=${page}&category=${category}&price=${price}&query=${query}`);
    dispatch(fetchProductsSuccess(request.data));
    console.log(request)
  } catch (e) {
    console.log(e);
  }
};
}
export function setError(errors) {
return {
  type: SET_ERROR,
  payload: errors,
};
}

// export const setPrice = (price) => {
//   return {
//     type: PRICE_QUERY,
//     payload: price,
//   }
// }

// export const setCategory = (category) => {
//   return {
//     type: CATEGORY_SORT,
//     payload: category,
//   }
// }

// export const setQuery = (query) => {
//   return {
//     type: CATEGORY_SORT,
//     payload: query,
//   }



