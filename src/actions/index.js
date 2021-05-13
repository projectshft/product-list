import axios from "axios";
import _ from 'lodash'

export const GET_PRODUCTS = "GET_PRODUCTS";

let selectedOptions = {}

export function getProducts(options) {
  const baseUrl = 'http://localhost:8000/products/?'
  if (options.page) {
    selectedOptions.page = options.page
  }
  if (options.category || options.category === '') {
    selectedOptions.category = options.category
  }
  if (options.sort || options.sort === '') {
    selectedOptions.sort = options.sort
  }

  if (!_.isEmpty(selectedOptions)) {
      const optionsString = `${selectedOptions.page || ''}&${selectedOptions.category || ''}&${selectedOptions.sort || ''}`
      return axios.get(`${baseUrl}${optionsString}`)
      .then(response => {
        return {
          type: GET_PRODUCTS,
          payload: response
        }; 
      })
      .catch(error => {
        alert('Error');
      });  
  } 
  else {
    return axios.get(baseUrl)
    .then(response => {
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

