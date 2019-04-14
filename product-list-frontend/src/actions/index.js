import axios from 'axios';
export const LOAD_PRODUCTS = 'load_products';


export function loadProducts(cat, sort) {
  const baseUrl = 'http://localhost:8000/products';
  const category = cat ? "category=" + cat : null;
  const sortBy = sort ? "price=" + sort : null;
  const urlConstructor = () => {
    if (category && sortBy) {
      return baseUrl +"?"+ category +"&"+ sortBy; 
    } else if (category) {
      return baseUrl +"?"+ category;
    } else if (sortBy) {
      return baseUrl +"?"+ sortBy;
    } else {
    return baseUrl;
  }
  }
  const url = urlConstructor();
  const products = axios.get(`${url}`);
  return {
    type: LOAD_PRODUCTS,
    payload: products,
  };
}