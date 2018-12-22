import queryString from "query-string";

export const GET_PRODUCTS = "GET_PRODUCTS"

const ROOT_URL = 'http://localhost:5000'

export const fetchProducts = async (query) => {
  
  //will need to fix this to request correctly
  //need to sneure searchTerm
  console.log(query)
  let requestUrl="";
  if(!query){
    requestUrl = `${ROOT_URL}/products`
  } else {
    requestUrl = `${ROOT_URL}/products?search=${query}`
  }

  
  const initialRequest = await fetch(requestUrl);
  const requestJSON = await initialRequest.json();
  return {
    type: GET_PRODUCTS,
    payload: requestJSON
  }
}

