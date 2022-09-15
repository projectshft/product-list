import axios from 'axios';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const COMBO_FILTER = 'COMBO_FILTER';

/**
 * { query: "" || undefined },
 * { category: "" || undefined }
 */

// export function fireQuery(params) {
//   let url = 'http://localhost:3000/api/products';

//   Object.keys(params).forEach((key, index) => {
//     const queryParam = params[key];

//     if (queryParam) {
//       url += `${index === 0 ? '?' : '&'}${key}=${queryParam}`;
//     }
//   })

//   const request = axios.get(url);

//    return {
//     type: COMBO_FILTER,
//     payload: request,
//   };
// }

export function combo(pgNumber, price = null, category = null, query = null) {
  const request = axios.get(
    `http://localhost:8000/products?page=${pgNumber}&price=${price}&category=${category}&query=${query}`
  );
  console.log(pgNumber, price, category, query);
  return {
    type: COMBO_FILTER,
    payload: request,
  };
}
export function fetchProduct() {
  const request = axios.get('http://localhost:8000/products?page=1');
  return {
    type: FETCH_PRODUCT,
    payload: request,
  };
}