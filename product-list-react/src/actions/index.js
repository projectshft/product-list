import axios from 'axios'
const ROOT_URL = "//localhost:8000/"


//action to fetch products from server
export function fetchProducts(searchTerm = "", category = "", sortBy = "", page = "") {
  //empty paths to add to url without any effect if the passed in arguments are empty
  let searchPath = "";
  let categoryPath = "";
  let sortPath = "";
  let pagePath = "";
  //if an argument is not an empty string, build out the path to add to the url
  if (searchTerm.length > 0) {
    searchPath = "query=" + searchTerm;
  }
  if (category.length > 0) {
    categoryPath = "category=" + category;
  }
  if (sortBy.length > 0) {
    sortPath = "price=" + sortBy;
  }
  if (page) {
    pagePath = "page=" + page;
  }

  const url = `${ROOT_URL}products?${searchPath}&${categoryPath}&${sortPath}&${pagePath}`;
  const request = axios.get(url);

  return {
    type: "FETCH_PRODUCTS",
    payload: request
  }
}

//action to add a search term to the store
export const addSearchTerm = searchTerm => ({
  type: "ADD_SEARCHTERM",
  payload: searchTerm
})

//action to add a category to the store
export const addCategory = category => ({
  type: "ADD_CATEGORY",
  payload: category
})

//action to add a sortBy value to the store
export const addSortBy = sortBy => ({
  type: "ADD_SORTBY",
  payload: sortBy
})

//action to add a current page to the store
export const addPage = page => ({
  type: "ADD_PAGE",
  payload: page
})
