/*=====================================================
Deletes ALL products of that type from a users cart!
=====================================================*/
export const DELETE_CART = 'DELETE_CART'

const ROOT_URL = "http://localhost:5000/me/cart";

export const deleteCart = async (token, productID) => {
  let bodyData = JSON.stringify({ productId: productID })
  let fetchOptions = {
    headers: { "Content-type": "application/json" },
    method: 'DELETE',
    body: bodyData
  }
  const initialRequest = await fetch(`${ROOT_URL}?token=${token}`, fetchOptions);

  const requestJSON = await initialRequest.json();
  return {
    type: DELETE_CART,
    payload: requestJSON
  };
};

