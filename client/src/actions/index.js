import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const CATEGORY_SEARCH = 'category_search';
export const PRICE_SEARCH = 'price_search';
export const PRODUCT_SEARCH = 'product_search';

const ROOT_URL = "http://localhost:8000/products?";

export function fetchProducts(query) {
    const request = axios.get(`${ROOT_URL}${query}`)
        .then((response) => {
            return response.data
        })
        .catch( (error) => {
            console.log(error)
        });

    console.log(request)
    
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
//searchCategory, searchPrice, productSearch
export function searchCategory(category) {
  console.log('from category action: ', category)
  return {
    type: CATEGORY_SEARCH,
    category: category
  };
}

export function searchPrice(price) {
  console.log('from price action: ', price)
  return {
    type: PRICE_SEARCH,
    price: price
  };
}

export function productSearch(name) {
  console.log('from search action: ', name)
    return {
      type: PRODUCT_SEARCH,
      name: name
    };
}
