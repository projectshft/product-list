import axios from 'axios';
//type switch statement
//export fetch products 
//fetch form data 

export const GET_PRODUCTS = 'GET_PRODUCTS';
const Url = 'http://localhost:3000/products';

export const getProducts = async () => {
  let request = await axios.get(`${Url}`)
    .then((response) => {
      console.log(response.data, 'response.data')
      return response.data; 
    })
    .catch((error) => {
      throw (error)
    })

  return {
    type: GET_PRODUCTS,
    payload: request
  };
}
