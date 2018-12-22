import queryString from "query-string";

export const GET_PRODUCT = "GET_PRODUCT";

const ROOT_URL = "http://localhost:5000/products/";

export const fetchProduct = async (id) => {
  let requestUrl = `${ROOT_URL}${id}`
  console.log("Getting one product")

  const initialRequest = await fetch(requestUrl);
  const requestJSON = await initialRequest.json();
  return {
    type: GET_PRODUCT,
    payload: requestJSON
  }
}
