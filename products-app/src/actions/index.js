import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const CHANGE_PAGE = "CHANGE_PAGE";

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
  }
}

export function sortProducts(factor, category, query) {
  let request = null;

  if(factor === undefined && category === undefined && query === undefined) {
    request = axios.get(`${ROOT_URL}`).catch(error => {
      alert(error);
    });
  } else if(factor !== undefined && category === undefined && query === undefined) {
    request = axios.get(`${ROOT_URL}?price=${factor}`).catch(error => {
     alert(error);
    });
  } else if(factor === undefined && category === undefined && query !== undefined) {
    request = axios.get(`${ROOT_URL}?query=${query}`).catch(error => {
      alert(error);
    })
  } else if(factor === undefined && category !== undefined && query === undefined) {
    request = axios.get(`${ROOT_URL}?category=${category}`).catch(error => {
      alert(error);
    });
  } else if(factor !== undefined && category !== undefined && query === undefined) {
    request = axios.get(`${ROOT_URL}?price=${factor}&category=${category}`).catch(error => {
      alert(error);
    })
  } else if(factor !== undefined && category === undefined && query !== undefined) {
    request = axios.get(`${ROOT_URL}?price=${factor}&query=${query}`).catch(error => {
      alert(error);
    })
  } else if(factor === undefined && category !== undefined && query !== undefined) {
    request = axios.get(`${ROOT_URL}?category=${category}&query=${query}`).catch(error => {
      alert(error);
    })
  } else {
    request = axios.get(`${ROOT_URL}?price=${factor}&category=${category}&query=${query}`).catch(error => {
      alert(error);
    })
  }

  return {
    type: SORT_PRODUCTS,
    payload: request
  }
};

export function changePage(pageNum) {
  const request = axios.get(`${ROOT_URL}?page=${pageNum}`).catch(error => {
    alert(error)
  });

  return {
    type: CHANGE_PAGE,
    payload: request
  }
}