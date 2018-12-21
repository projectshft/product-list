export const GET_PRODUCTS = "GET_PRODUCTS"

const ROOT_URL = 'http://localhost:5000/'

export const fetchProducts = async (query) => {
  //will need to fix this to request correctly
  const initialRequest = await fetch(ROOT_URL+'products');
  const requestJSON = await initialRequest.json();
  return {
    type: GET_PRODUCTS,
    payload: requestJSON
  }
}

