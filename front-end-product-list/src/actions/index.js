import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_SEARCH = 'FETCH_SEARCH';

export function fetchProducts(query) {

  // Set the search to an empty string
  let search = ""

  // If filtering by category change the url to include the category
  if (query.category) {
    search = `${search}&category=${query.category}`
  } 

  // If sorting by price change the url to include the price
  if (query.price) {
    search = `${search}&price=${query.price}`
  } 
  
  if (query.page) {
    search = `${search}&page=${query.page}`
  }

  // Set the url to the root url and the search
  let url = `${ROOT_URL}products?${search}`

  // Get the product data using the interpolated url 
  const productData = axios.get(url)
    .catch(function (error) {
      if (error) {
        console.log(error);
      }
    });
        console.log(productData)
    return {
      type: FETCH_PRODUCTS,
      payload: productData
  };
}

export function fetchSearch(query) {

    // Set the url to the root url and the search query 
    let url = `${ROOT_URL}search?query=${query}`
  
    const productData = axios.get(url)
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
         console.log('search',productData)
      return {
        type: FETCH_SEARCH,
        payload: productData
    };
  }
