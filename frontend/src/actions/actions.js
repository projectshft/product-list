import axios from 'axios';

const baseUrl = 'http://localhost:8000/products?';

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = (query,category,price,page) => {

  const queryUrl = () => {
    if (query) {
      return `query=${query}`;
    }
    return 'query=';
  }
  
  const categoryUrl = () => {
    if (category) {
      return `&category=${category}`;
    }
    return '&category=';
  }
  
  const priceUrl = () => {
    if (price) {
      return `&price=${price}`;
    }
    return '&price=';
  }

  const pageUrl = () => {
    if (page) {
      return `&page=${page}`;
    }
    return '&page=';
  }

  const request = axios.get(baseUrl+queryUrl()+categoryUrl()+priceUrl()+pageUrl())

  return {
    type: GET_PRODUCTS,
    payload: request
  };
}