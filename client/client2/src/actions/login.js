

export const LOGIN = "LOGIN"

const ROOT_URL = "http://localhost:5000/login";

export const login = async (username,password) => {
  /*=====================================================
  add the username and password to request body
  =====================================================*/
  let requestUrl = `${ROOT_URL}`;
  let bodyData = JSON.stringify({user:username,passphrase:password})
  let fetchOptions = {
    headers: { "Content-type": "application/json" },
    method: 'POST',
    body: bodyData
  }
//make it a post request
  const initialRequest = await fetch(requestUrl, fetchOptions);
  const requestJSON = await initialRequest.json();
  return {
    type: LOGIN,
    payload: requestJSON
  };
};