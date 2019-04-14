import axios from 'axios';
export const LOAD_PRODUCTS = 'load_products';


export function loadProducts(cat, sort, page) {
  const baseUrl = 'http://localhost:8000/products';
  const category = cat ? "category=" + cat : null;
  const sortBy = sort ? "price=" + sort : null;
  const pageNumber = page ? "page=" + page : null;
  const urlConstructor = () => {
    if (category && sortBy && page) {
      return baseUrl +"?"+ category +"&"+ sortBy + "&" + page; 
    } else if (category) {
      return baseUrl +"?"+ category;
    } else if (sortBy) {
      return baseUrl +"?"+ sortBy;
    } else if (pageNumber) {
      return baseUrl +"?"+ pageNumber;
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