import axios from 'axios';

// Creating URL components for readability

const ROOT_URL = 'http://localhost:8000/products';
const QUERY = '?';
const JOIN = '&';
const CATEGORY = 'category=';
const SEARCH = 'search=';
const SORT = 'price=';
const PAGE = 'page=';


export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_PAGE = 'SET_PAGE';



export function fetchProducts(searchTerm = null, sortOption = null, category = null, page = 1) {
  let url = ROOT_URL; 
  
  // url only modified when query param is added
  // all params are optional
  if (searchTerm || sortOption || category || page > 1) {
    url += QUERY;

    // page is always the first of the optional query params,
    // but only if the page selected is greater than 1
    if (page > 1 ) {
      url += PAGE + page + JOIN;
    }
   
    // searchTerm is the next optional query param
    if (searchTerm.length !== 0) {
      
      url += SEARCH + searchTerm;

      if (sortOption) {
        url += JOIN + SORT + sortOption;
      }
      if (category !== null && category.length !== 0) {
        url += JOIN + CATEGORY + category;
      }
    
    // sortOption is the next optional query param
    // as long as it is not null
    } else if (sortOption) {
      url += SORT + sortOption;
      if (category !== null && category.length !== 0) {
        url += JOIN + CATEGORY + category;
      }
    
    // category is the last optional query param
    // as long as it is not null
    } else if (category !== null && category.length !== 0) {
      url += CATEGORY + category;
    }
  }

  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function setSortOption(sortOption) {
  return {
    type: SET_SORT_OPTION,
    payload: sortOption
  }
}

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  }
}

// Not currently being used: fetchCategories()

/////////////////////////////////////////////////////


//export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

// export function fetchCategories() {
//   console.log("fetchCategories was called")
//   let url = ROOT_URL_CATEGORIES;

//   const request = axios.get(url);
//   console.log("This is the categories request");
//   console.log(request);
//   return {
//     type: FETCH_CATEGORIES,
//     payload: request
//   };
// }