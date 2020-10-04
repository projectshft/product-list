import axios from 'axios';
import albumItems from '../data/album';
// action for calling products via API
export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts(page, category, search) {
  console.log('In actions index/ fetchProducts()')
  // TODO separate quantity? (thinking this is a wasted call to db)
  // const request = axios.get(
  //   `${ROOT_URL}?=${search}&page=${page}&category=${category}`
  // );
  console.log(`sanity check on albumItems ${albumItems}`);
  // let request = albumItems;
console.log('got', albumItems);
console.log(` and page: ${page} and category: ${category} and search: ${search}`);
  return {
    type: FETCH_PRODUCTS,
    payload: albumItems,
  };
}

//sent to reducers to fetch data
