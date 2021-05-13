import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";


export function getProducts(options) {
  const baseUrl = 'http://localhost:8000/products/?'

  if (options) {
    return axios.get(`${baseUrl}${options}`)
    .then(response => {
      //console.log(response);
      return {
        type: GET_PRODUCTS,
        payload: response
      }; 
    })
    .catch(error => {
      alert('Error');
    });
  } else {
    return axios.get(baseUrl)
    .then(response => {
      //console.log(response);
      return {
        type: GET_PRODUCTS,
        payload: response
      }; 
    })
    .catch(error => {
      alert('Error');
    });
  }
};

