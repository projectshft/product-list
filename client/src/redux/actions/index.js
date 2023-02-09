import axios from 'axios';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'; 
// export const SORT_PRODUCTS_BY_PRICE = 'SORT_PRODUCTS_BY_PRICE';

export function getProducts(query){
  const request = axios.get(`http://localhost:3000/products?query=${query}`) 
    return {
      type: GET_PRODUCTS,
      payload: request,
    };
  };

export function getCategories(category){
  return axios.get(`http://localhost:3000/products?category=${category}`)
  .try(response => {
    console.log(response)
    return {
      type: 'GET_PRODUCTS_BY_CATEGORY',
      payload: category
    }
  })
  .catch(err => {
    alert('Choose a category');
  });
};

// export function sortPrice(price){
//   return axios.get(`http://localhost:3000/price=${price}`)
//   // return axios.get(`http://localhost:3000/products?category=${category}&${price}=highest`)
//   .try(response => {
//     console.log(response)
//     return {
//       type: 'SORT_PRODUCTS_BY_PRICE',
//       payload: price
//     }
//   })
//   .catch(err => {
//     alert('Select lowest or highest');
//   });
// };