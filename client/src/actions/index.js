import axios from "axios";

const ROOT_URL = `http://localhost:8000/products`;
const CAT_URL =`http//localhost:8000/categories`;


export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";


//when dispatched, fetchProducts make an api call (with axios) will pass response (products) through the reducer and to the component
export const fetchProducts = () => {
  //request is a promise - doesn't initially contain data
  //to see what data is returned -- look in reducers
  const products = axios.get(ROOT_URL);
  // console.log('Requested Data Response: ', request)

  return {
    type: FETCH_PRODUCTS,
    payload: products
  };
};

export const fetchCategories = () => {
  //request is a promise - doesn't initially contain data
  //to see what data is returned -- look in reducers
  const categories = axios.get(CAT_URL);
  // console.log('Requested Data Response: ', request)

  return {
    type: FETCH_CATEGORIES,
    payload: categories
  };
};

/* ***** add in begin (...loading)/(success)/failure (err)*/