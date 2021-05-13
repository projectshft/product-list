import axios from "axios";
import _ from 'lodash';

export const GET_PRODUCTS = "GET_PRODUCTS";

let selectedOptions = {};

export function getProducts(options) {
  const baseUrl = 'http://localhost:8000/products/?'

  //check if options exist, if they do assign them to local state, '' will revert to the search without option, passed when "Sort by Price" or "Select a Category" are choosen to "undo" sorting by price/filter by category

  if (options.page) {
    selectedOptions.page = options.page
  }
  if (options.category || options.category === '') {
    selectedOptions.category = options.category
  }
  if (options.sort || options.sort === '') {
    selectedOptions.sort = options.sort
  }

  //if options exist, create search url using options.
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

  //return all products when no options exist/on first render
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

