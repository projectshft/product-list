import axios from 'axios';

export const PRODUCTS_RECIEVED = 'PRODUCTS_RECIEVED';
export const PAGE_NUMBER_RECIEVED = 'PAGE_NUMBER_RECIEVED';
export const QUERY_DATA_RECIEVED = 'QUERY_DATA_RECIEVED';

export const getProducts = (category, priceSort, query, page) => {
  const ROOT_URL = 'http://localhost:8000/products?'

  const request = axios.get(`${ROOT_URL}page=${page}&category=${category}&query=${query}&price=${priceSort}`)
    .catch((error) => {
      throw error;
    });

  return {
    type: PRODUCTS_RECIEVED,
    payload: request
  }
}

export const setQueryData = (category, priceSort, query) => {

  const queryData = {
    category: category,
    priceSort: priceSort,
    query: query
  }

  return {
    type: QUERY_DATA_RECIEVED,
    payload: queryData
  }
}

export const setCurrentPage = (pageNumber) => {

  return {
    type: PAGE_NUMBER_RECIEVED,
    payload: pageNumber
  }
}