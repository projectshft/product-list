
export const GET_CART = 'GET_CART'

const ROOT_URL = "http://localhost:5000/me/cart";

export const getCart = async (token) => {
 
  const initialRequest = await fetch(`${ROOT_URL}?token=${token}`);
  
  const requestJSON = await initialRequest.json();
  return {
    type: GET_CART,
    payload: requestJSON
  };
};
