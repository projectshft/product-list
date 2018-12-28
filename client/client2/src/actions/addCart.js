/*=====================================================
This action adds a product to a logged in user's cart
the promise is resolved before going to the reducer
=====================================================*/
export const ADD_CART = 'ADD_CART';

const ROOT_URL = "http://localhost:5000/me/cart";

export const addCart = async (token, productID) => {
  let bodyData = JSON.stringify({productId:productID})
  let fetchOptions = {
    headers: {"Content-type": "application/json"},
    method: 'POST',
    body:bodyData}
  const initialRequest = await fetch(`${ROOT_URL}?token=${token}`,fetchOptions);

  const requestJSON = await initialRequest.json();
  return {
    type: ADD_CART,
    payload: requestJSON
  };
};

