
export const GET_CART = 'GET_CART'

const ROOT_URL = "http://localhost:5000/me/cart";

export const fetchProduct = async id => {
  let requestUrl = `${ROOT_URL}${id}`;
  console.log("Getting one product");

  const initialRequest = await fetch(requestUrl);
  const requestJSON = await initialRequest.json();
  return {
    type: GET_PRODUCT,
    payload: requestJSON
  };
};
