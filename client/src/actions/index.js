//Other way

// import axios from 'axios';


// const url = 'http://localhost:8000/products'

// export const createProduct = (product) => axios.post(url, product);

// export const getProducts = () => axios.get(url);

// export const deleteProduct = (id) => axios.delete(`${url}/${id}`);
// export const createProduct = (product) => async (dispatch) => {
//   const { data } = await api.createProduct(product);
//   dispatch({ type: 'PRODUCT', payload: data });
//   }


// export const getProducts = () => async (dispatch) => {
//   const {data} = await api.getProducts();
//   dispatch({ type: 'GET', payload: data})
//     }

// export const deleteProduct = (id) => async (dispatch) => {
//   const { data } = await api.deleteProduct(id);
//   dispatch({ type: 'DELETE', payload: data });
//    }


import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const SET_ERROR = "SET_ERROR";

const ROOT_URL = "http://localhost:8000/products";

//Fetch products
  const fetchProductsSuccess = (products) => ({
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: { products },
  });


  export const fetchProducts = (category, price, query) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(
        `${ROOT_URL}/?category=${category}&price=${price}&query=${query}`
      );
      dispatch(fetchProductsSuccess(request.data));
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


