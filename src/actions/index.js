import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";


export function getProducts() {
  return axios.get(`http://localhost:8000/products/`)
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
};

