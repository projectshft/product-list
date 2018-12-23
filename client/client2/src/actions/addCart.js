/*=====================================================
TODO: figre out how to post with fetch API
=====================================================*/
export const ADD_CART = 'ADD_CART';

const ROOT_URL = "http://localhost:5000/me/cart";

export const addCart = async (token, productID) => {

  const initialRequest = await fetch(`${ROOT_URL}?token=${token}`);

  const requestJSON = await initialRequest.json();
  console.log(requestJSON)
  return {
    type: ADD_CART,
    payload: requestJSON
  };
};

