import axios from "axios";

export const FIND_DATA = "FIND_DATA";
export const CHANGE_PAGE = "CHANGE_PAGE";

export function findData()  {
  const request = axios.get(`http://localhost:8000/products`);

  return {
    type: FIND_DATA,
    payload: request,
  }
};

export function changePage(page) {
  const request = axios.get(`http://localhost:8000/products?page=${page}`);

  return {
    type: CHANGE_PAGE,
    payload: request,
  }
};
