import axios from 'axios';

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const SORT_PRICE = 'SORT_PRICE';
export const SET_PAGE = 'SET_PAGE';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const ROOT_URL = 'http://localhost:3000/products';

export const searchProduct = async (input, page) => {
  let request = await axios.get(`${ROOT_URL}?page=${page}&query=${input}`)
    .then((response) => {
      console.log(response.data.products, response.data.count)
      return response.data.products; 
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    type: SEARCH_PRODUCT,
    payload: request
  };
}

export const updateCategory = async (category) => {
  let request = await axios.get(`${ROOT_URL}?category=${category}`)
    .then((response) => {
      console.log(response.data.products, response.data.count)
      return response.data.products; 
    })
    .catch((error) => {
      console.log(error)
    })

  return {     
    type: UPDATE_CATEGORY,
    payload: request
  }
}

export const sortPrice = async (price, category) => {
  let request = await axios.get(`${ROOT_URL}?category=${category}&price=${price}`)
    .then((response) => {
      console.log(response.data.count)
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    type: SORT_PRICE,
    payload: request,
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page    
  }
}

