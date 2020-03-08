import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

export async function fetchProducts(query = {}) {
  let url = 'http://localhost:8000/products';
  let previousQuery = false;

  // query filter and request
  console.log(' query params inside action call ', query) 
  for (let key in query) {
    if (previousQuery) {
      url += `&${key}=${query[key]}`;
    } else {
      url += `?${key}=${query[key]}`; 
      previousQuery = true;
    }
  }

  const request = await axios.get(url);
  const {  products, total, pages, page, category, limit } = request.data;  
  console.log('inside action-index ',request.data) 
  console.log('inside action-index ',request.data.products[0].category) 
  return {
    type: FETCH_PRODUCTS,
    payload: request,
    products,
    total,
    pages,
    page,
    category,
    limit
  };
}


// export const GET_CATEGORIES = 'GET_CATEGORIES';
// export const getCategories = () => {
//   let url = rootURL + '/products/categories';
//   const request = axios.get(url, {
//     headers: { 'Content-Type': 'application/json' }
//   });
//   return {
//     type: GET_CATEGORIES,
//     payload: request
//   };
// };



// import axios from 'axios';

// const ROOT_URL = 'http://makeup-api.herokuapp.com/api/v1/products.json?'

// export const FETCH_MAKEUP = 'FETCH_MAKEUP';
// export const RESET_MAKEUP = 'RESET_MAKEUP';

// export function resetMakeUp() {
//   return {
//     type: RESET_MAKEUP,
//   };
// }
// export function fetchMakeUp(tags, products) {
//   const url = `${ROOT_URL}product_tags=${tags}&product_type=${products}`;
//   //console.log('url searched', url)
//   const request = axios.get(url)
//     .catch(function (error) {
//       if (error.response) {
//         // Request made and server responded
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//         window.confirm(`error call did not returned data check console.log`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//         window.confirm(`error call did not returned data check console.log`);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//         window.confirm(`error call did not returned data check console.log`);
//       }

//     });
//   return {
//     type: FETCH_MAKEUP,
//     payload: request

//   };
// }
