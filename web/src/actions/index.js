import axios from 'axios';
// import albumItems from '../data/album';
// action for calling products via API
export const FETCH_PRODUCTS = 'fetch_products';
export const SET_CURRENT_PAGE = 'set_current_page';

const ROOT_URL = 'http://localhost:8000/products?';

export function fetchProducts(page, category, search, sort) {
  console.log('In actions index/ fetchProducts()')
  let queryBuild = '';
  if (search) {
    queryBuild = queryBuild + `q=${search}&`
  }
  if (page) {
    queryBuild = queryBuild + `page=${page}&`;
  }
  if (category) {
    queryBuild = queryBuild + `category=${category}&`
  }
  if (sort) {
    queryBuild = queryBuild + `sort=${sort}`
  }

  const request = axios.get(
    `${ROOT_URL}${queryBuild}`
  );
  // ?=${search}&page=${page}&category=${category}
  // TODO tesy sorting
console.log('got', request);
console.log(` and page: ${page} and category: ${category} and search: ${search}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}


export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page  };
}



//sends to reducers
