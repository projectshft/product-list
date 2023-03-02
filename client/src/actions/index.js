// import axios from 'axios';

// export const GET_PRODUCTS = 'GET_PRODUCTS';

// const URL ='http://localhost:8000/products';

// export const getProduct = async () => {
//   let request = await axios.get(`${URL}`)
//     .then((response) => {
//       console.log(response.data, 'response data')
//       return response.data; 
//     })
//     .catch((error) => {
//       console.log(error, 'err data response')
//     })
//   return {
//     type: GET_PRODUCTS,
//     payload: request
//   }
// };