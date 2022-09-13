import axios from 'axios';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PAGE = 'FETCH_PAGE';
export const PRICE_FILTER = 'PRICE_FILTER';
export const CATEGORY_FILTER = 'CATEGORY_FILTER';
export const PAGE_FILTER = 'PAGE_FILTER';
export const COMBO_FILTER = 'COMBO_FILTER';

export function combo(
  pgNumber = 1,
  price = null,
  category = null,
  query = null
) {
  const request = axios.get(
    `http://localhost:8000/products?page=${pgNumber}&price=${price}&category=${category}&query=${query}`
  );
  // console.log(pgNumber, price, category);
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

export function fetchPage(pgNumber) {
  const request = axios.get(`http://localhost:8000/products?page=${pgNumber}`);
  // &price=highest&category=Grocery
  return {
    type: FETCH_PAGE,
    payload: request,
  };
}

export function priceFilter(price) {
  const request = axios.get(`http://localhost:8000/products?price=${price}`);

  return {
    type: PRICE_FILTER,
    payload: request,
  };
}

export function categoryFilter(category) {
  const request = axios.get(
    `http://localhost:8000/products?category=${category}`
  );

  return {
    type: CATEGORY_FILTER,
    payload: request,
  };
}

// export function pageFilter(pgNumber = null, price = '') {
//   const request = axios.get(
//     `http://localhost:8000/products?price=${price}&page=${pgNumber}`
//   );

//   return {
//     type: PAGE_FILTER,
//     payload: request,
//   };
// }
