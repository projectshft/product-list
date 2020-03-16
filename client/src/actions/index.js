import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const CATEGORY_SEARCH = 'category_search';
export const PRICE_SEARCH = 'price_search';
export const PRODUCT_SEARCH = 'product_search';
export const SET_PAGE = 'set_page';


const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts(query) {
  console.log('actions query: ', query)
  //${ROOT_URL}?page=${query.page}&category=${query.category}...
  const request = axios.get(`${ROOT_URL}?page=${query.page}&category=${query.category}&price=${query.price}&name=${query.name}`)
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

  export function setCurrentPage(page) {
    console.log('from page action: ', page)
      return {
        type: SET_PAGE,
        page: page
      };
  }
  

