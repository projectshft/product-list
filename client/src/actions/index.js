import axios from "axios";

// export const FETCH_CATEGORY = "fetch_category";
export const FETCH_PRODUCTS = "fetch_products";
export const CATEGORY_SEARCH = "category_search";
export const PRICE_SEARCH = "price_search";
// export const FETCH_PRICE = "fetch_price";
// export const FETCH_PAGE

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts(query) {
  const url = `${ROOT_URL}${query.category}${query.price}`
  const request = axios.get(url).then((response) =>{
    return response.data
  }).catch((error)=> {
    console.log('error from fetching products with query: ', query)
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

// export function fetchCategory(category) {
//   console.log(category)
//   const url = `${ROOT_URL}?page=1&category=${category}`
//   const request = axios.get(url)

 
//   return {
//     type: FETCH_CATEGORY,
//     payload: request
//   };
// }

// export function fetchPrice(price) {
//   const url = `${ROOT_URL}${price}`
//   const request = axios.get(url)

 
//   return {
//     type: FETCH_PRICE,
//     payload: request
//   };
// }

export function searchCategory(category) {
  return {
    type: CATEGORY_SEARCH,
    category: category
  };
}

export function searchPrice(price) {
  return {
    type: PRICE_SEARCH,
    price: price
  };
}

