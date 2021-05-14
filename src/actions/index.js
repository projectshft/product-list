import axios from "axios";
import _ from 'lodash';

export const GET_PRODUCTS = "GET_PRODUCTS";

let selectedOptions = {};
let optionsString = ''

export function getProducts(options) {
  const baseUrl = 'http://localhost:8000/products/?';

  //check if options exist, if they do assign them to local state, '' will revert to the search without option, passed when "Sort by Price" or "Select a Category" are choosen to "undo" sorting by price/filter by category

  if (options.page) {
    selectedOptions.page = options.page;
  };
  if (options.category || options.category === '') {
    selectedOptions.category = options.category;
  };
  if (options.sort || options.sort === '') {
    selectedOptions.sort = options.sort;
  };
  if (options.name || options.name === '') {
    selectedOptions.name = options.name;
  };
  
  //if options exist, create search url using options.
  if (!_.isEmpty(selectedOptions)) {
      optionsString = `${selectedOptions.page || ''}&${selectedOptions.category || ''}&${selectedOptions.sort || ''}&${selectedOptions.name || ''}`;
    };
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
};
