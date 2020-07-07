import axios from 'axios';

const ROOT_URL = `/products`;

// set action type to a variable, to prevent possible typos in reducer
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export function fetchProducts(state) {
  console.log('inside fetchProducts actions index.js, state=', state)
  const page = Number(state.page);
  const search = state.search;
  const category = state.category;
  const price = state.price;
  
  //the following if statements will build up the url based on the state/chosen query parameters
  let url = ROOT_URL;
  
    url = url + `?page=${page}`;
    
    if (search !== null) {
      url = url + `&search=${search}`
    } 

    if (category !== null) {
      url = url + `&category=${category}`
    } 

    if (price !== null) {
      url = url + `&price=${price}`
    } 
   
 console.log('inside fetch products action, url=', url)
  const request = axios.get(url);
  
  // at this point the request doesn't contain the returned api data yet, it's probably still in the pending state. We need a way to set our store state until AFTER the promise is fulfilled (when the api returns data). We only want to call the reducer when the data is returned, this is where applyMiddleware comes in (see the main index.js)
  //the payload is a promise (request)
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}