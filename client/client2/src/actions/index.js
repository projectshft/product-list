import queryString from "query-string";

export const GET_PRODUCTS = "GET_PRODUCTS"

const ROOT_URL = 'http://localhost:5000'

export const fetchProducts = async (query) => {
  //first, i need to take out the relavant info from the call
  let queryObj = {
    search:query.searchTerm,
    category:query.category,
    price:query.sortByPrice,
    page:query.page
  }
//then parse into a usable URL

  let requestUrl = `${ROOT_URL}/products?${queryString.stringify(queryObj)}`
 
  const initialRequest = await fetch(requestUrl);
  const requestJSON = await initialRequest.json();
  return {
    type: GET_PRODUCTS,
    payload: requestJSON
  }
}

